# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site serves iPhone and iPad users evaluating Freezon products. For Freezon Banner, the primary audience is people preparing visible text for concerts, music festivals, sports events, live streams, reception, meetings, and other in-person situations where a phone or tablet becomes a handheld sign.

## Product Purpose

`freezonapp.com` is the official product, support, and privacy site for the Freezon product family. The Freezon Banner surface must let a first-time visitor understand the app quickly, see its real interface and visual output, and reach its support and privacy information.

## Positioning

Freezon Banner is an on-device iPhone and iPad tool for creating high-visibility static text and scrolling messages. It combines live preview, multi-direction scrolling, display fonts, four text effects, solid and LED-matrix backgrounds, recent items, and favorites without accounts, advertising, servers, or a required network connection for editing, preview, and full-screen display.

## Operating Context

The app is used in bright, crowded, time-sensitive live environments. Users prepare a banner, adjust its type, motion, colors, and effects, then present it full-screen. Saved recent items and favorites support fast switching during an event.

## Capabilities and Constraints

- The existing site is static HTML, CSS, and vanilla JavaScript.
- Freezon Banner supports iOS and iPadOS 17 or later.
- Supported website locales are Simplified Chinese, Traditional Chinese, English, and Japanese through the existing `?lang=` convention.
- Confirmed features include static and scrolling display, left/right/up/down motion, live preview, speed and size controls, bundled offline fonts, standard/outline/neon/bulb effects, high-contrast colors, solid and LED-matrix backgrounds, recent items, favorites, full-screen lock, and local persistence.
- The Banner homepage route is `/freezon-banner/`; support and privacy remain at `/support/freezon-banner/` and `/privacy/freezon-banner/`.
- No verified App Store product URL is currently present in this repository. Do not publish a download link until a real URL is supplied.

## Brand Commitments

- Product names are `定格手持弹幕`, `定格手持彈幕`, and `Freezon Banner`; Japanese currently uses `定格手持弹幕` in the approved site copy.
- The Banner homepage should feel as vivid, cool, and fashion-forward as the approved App Store campaign: fluorescent pink, electric blue, acid green, energetic hand-drawn characters, charms, ribbons, hearts, and real app screens.
- Preserve the approved campaign imagery and wording. The website may recompose those materials responsively but must not redraw real app UI or invent product behavior.
- Freezon Photo Vault keeps its existing quiet privacy-led identity; the Banner surface receives its own product-specific visual world.

## Evidence on Hand

- Product specification: `/Users/mac/code/local/app-handheld-banner/PRODUCT_SPEC.md`.
- Approved visual baseline: `/Users/mac/code/local/app-handheld-banner/DESIGN_VISUAL_BASELINE.md`.
- Campaign source and four-language exports: `/Users/mac/code/local/app-handheld-banner/appstore/`.
- Existing Banner support and privacy pages are already localized in this repository.
- Existing Banner app icon: `/Users/mac/code/local/freezon-site/assets/freezon-banner-icon.png`.
- No testimonials, usage metrics, press quotes, or verified App Store URL are available and none may be fabricated.

## Product Principles

- Show the real product at work instead of describing it with generic feature claims.
- Make the live-event energy immediate while keeping text readable and navigation predictable.
- Treat on-device operation, no account, no automatic upload, and no advertising as concrete trust facts.
- Keep each Freezon product visually distinct while maintaining clear family navigation.
- Keep every public claim traceable to product specifications, source behavior, or approved campaign copy.

## Accessibility & Inclusion

The website must remain keyboard accessible, readable at mobile and desktop widths, free of incoherent overlap or horizontal overflow, and respectful of `prefers-reduced-motion`. Essential meaning must not rely only on color or motion. Campaign images require meaningful localized alternatives.
