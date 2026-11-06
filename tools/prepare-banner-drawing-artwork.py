#!/usr/bin/env python3

import argparse
import hashlib
import json
import shutil
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw


LOCALES = ("zh-Hans", "zh-Hant", "en", "ja", "ko")
DEVICES = ("iphone", "ipad")
PAGES = (
    "02-drawing-cheer.png",
    "03-drawing-kitten.png",
    "05-drawing-birthday.png",
)
OUTPUT_WIDTH = {"iphone": 900, "ipad": 1600}
BEZELS = {
    "iphone": "iphone-18-pro/iPhone 18 Pro - Silver - Portrait.png",
    "ipad": 'ipad-pro-11/iPad Pro (M5) 11" - Silver - Landscape.png',
}
SCREEN_CORNER_RATIO = {"iphone": 0.047, "ipad": 0.03}
SCREEN_BLEED = {"iphone": 8, "ipad": 8}


def parse_args():
    parser = argparse.ArgumentParser(
        description="Prepare device-only Freezon Banner drawing artwork for the website."
    )
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("../app-handheld-banner/appstore/with-status-bar"),
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("assets/banner"),
    )
    return parser.parse_args()


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_bounds(verification_path):
    with verification_path.open(encoding="utf-8") as source:
        verification = json.load(source)

    exact = {}
    fallback = {}
    for output in verification["outputs"]:
        page = Path(output["file"]).name
        device = output["device"]
        if device not in DEVICES or page not in PAGES:
            continue
        bounds = (
            tuple(output["deviceBounds"]),
            tuple(output["screenBounds"]),
        )
        exact[(output["locale"], device, page)] = bounds
        fallback.setdefault((device, page), bounds)
    return exact, fallback


def load_device_bezels(source_root):
    bezel_root = source_root.parent / "device-bezels"
    bezels = {}
    bezel_hashes = {}

    for device, image_name in BEZELS.items():
        image_path = bezel_root / image_name
        if not image_path.exists():
            raise SystemExit(f"missing official device bezel: {image_path}")

        with Image.open(image_path) as bezel:
            oriented = bezel.convert("RGBA")

        if device == "iphone":
            oriented = oriented.transpose(Image.Transpose.ROTATE_270)

        bezels[device] = oriented
        bezel_hashes[device] = sha256(image_path)

    return bezels, bezel_hashes


def main():
    args = parse_args()
    source_root = args.source.resolve()
    output_root = args.output.resolve()
    verification_path = source_root / "drawing-verification.json"
    cwebp = shutil.which("cwebp")
    if not cwebp:
        raise SystemExit("cwebp is required")
    if not verification_path.exists():
        raise SystemExit(f"missing verification file: {verification_path}")

    exact_bounds, fallback_bounds = load_bounds(verification_path)
    device_bezels, bezel_hashes = load_device_bezels(source_root)
    created_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    written = []

    with tempfile.TemporaryDirectory(prefix="freezon-banner-drawing-") as temp_dir:
        temp_root = Path(temp_dir)
        for locale in LOCALES:
            for device in DEVICES:
                for page in PAGES:
                    source_path = source_root / locale / device / page
                    if not source_path.exists():
                        raise SystemExit(f"missing source artwork: {source_path}")

                    verified_bounds = exact_bounds.get((locale, device, page))
                    if verified_bounds is None:
                        verified_bounds = fallback_bounds[(device, page)]
                    device_bounds, screen_bounds = verified_bounds

                    with Image.open(source_path) as image:
                        crop = image.convert("RGBA").crop(device_bounds)
                        screen_box = (
                            screen_bounds[0] - device_bounds[0],
                            screen_bounds[1] - device_bounds[1],
                            screen_bounds[2] - device_bounds[0],
                            screen_bounds[3] - device_bounds[1],
                        )
                        screen_width = screen_box[2] - screen_box[0]
                        screen_height = screen_box[3] - screen_box[1]
                        screen_radius = round(
                            min(screen_width, screen_height) * SCREEN_CORNER_RATIO[device]
                        )
                        screen_mask = Image.new("L", crop.size, 0)
                        ImageDraw.Draw(screen_mask).rounded_rectangle(
                            (
                                screen_box[0],
                                screen_box[1],
                                screen_box[2] - 1,
                                screen_box[3] - 1,
                            ),
                            radius=screen_radius,
                            fill=255,
                        )
                        output = Image.new("RGBA", crop.size, (0, 0, 0, 0))
                        bleed = SCREEN_BLEED[device]
                        ImageDraw.Draw(output).rounded_rectangle(
                            (
                                screen_box[0] - bleed,
                                screen_box[1] - bleed,
                                screen_box[2] + bleed - 1,
                                screen_box[3] + bleed - 1,
                            ),
                            radius=screen_radius + bleed,
                            fill=(0, 0, 0, 255),
                        )
                        output.paste(crop, (0, 0), screen_mask)
                        bezel = device_bezels[device].resize(
                            crop.size,
                            Image.Resampling.LANCZOS,
                        )
                        output.alpha_composite(bezel)
                        temp_png = temp_root / f"{locale}-{device}-{page}"
                        output.save(temp_png, format="PNG", optimize=True)

                    target_dir = output_root / locale / device
                    target_dir.mkdir(parents=True, exist_ok=True)
                    target_path = target_dir / f"{Path(page).stem}.webp"
                    subprocess.run(
                        [
                            cwebp,
                            "-quiet",
                            "-q",
                            "86",
                            "-alpha_q",
                            "100",
                            "-m",
                            "6",
                            "-sharp_yuv",
                            "-metadata",
                            "none",
                            "-resize",
                            str(OUTPUT_WIDTH[device]),
                            "0",
                            str(temp_png),
                            "-o",
                            str(target_path),
                        ],
                        check=True,
                    )

                    relative_source = source_path.relative_to(source_root.parent.parent)
                    metadata = {
                        "prompt": (
                            "Origin: device-only crop of the approved App Store drawing campaign image at "
                            f"../app-handheld-banner/{relative_source}. The verified deviceBounds from "
                            "drawing-verification.json preserve the real app screen while excluding the "
                            "marketing text layer. A black screen bleed sits under Apple's official transparent "
                            "bezel to prevent colored page backgrounds from showing through at the inner frame "
                            "edge. No campaign background or color fringe remains outside the hardware edge. "
                            "This is sourced product artwork, not AI-generated during the website "
                            "build."
                        ),
                        "sourceSHA256": sha256(source_path),
                        "bezelSHA256": bezel_hashes[device],
                        "createdAt": created_at,
                    }
                    metadata_path = target_path.with_suffix(".webp.json")
                    metadata_path.write_text(
                        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
                        encoding="utf-8",
                    )
                    written.append(target_path)

    total_bytes = sum(path.stat().st_size for path in written)
    print(f"prepared {len(written)} drawing assets ({total_bytes / 1024 / 1024:.1f} MiB)")


if __name__ == "__main__":
    main()
