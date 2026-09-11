---
name: Freezon Banner Campaign
description: A vivid working live-event poster system scoped to the Freezon Banner marketing surface.
colors:
  ink: "#080b0d"
  screen-black: "#030506"
  control-surface: "#101417"
  paper: "#fffdf7"
  pure-white: "#ffffff"
  fluorescent-pink: "#ff207c"
  electric-blue: "#0969f4"
  acid-green: "#c8ff32"
  electric-cyan: "#35d5e3"
  chapter-backdrop: "none"
  light-line: "rgba(255, 255, 255, 0.18)"
typography:
  display:
    fontFamily: "Banner Display, PingFang SC, sans-serif"
    fontSize: "84px"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "0"
  headline:
    fontFamily: "Banner Display, PingFang SC, sans-serif"
    fontSize: "76px"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "13px"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0"
rounded:
  sharp: "0"
  control: "4px"
  panel: "8px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.acid-green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  input-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 13px"
    height: "46px"
  demo-panel:
    backgroundColor: "{colors.control-surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.panel}"
  chapter-copy:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.sharp}"
    padding: "0"
---

# Design System: Freezon Banner Campaign

## Overview

**Creative North Star: "The Working Live-Event Poster"**

Freezon Banner turns approved campaign artwork and real product screens into a functional poster world. Fluorescent fields, black ink, hand-drawn campaign art, and oversized oblique display type carry live-event energy; controls remain compact, sharp, and immediately usable.

This system is scoped to the Freezon Banner marketing surface. Freezon Photo Vault keeps its existing quiet, privacy-led identity, and other Freezon product surfaces may use distinct palettes and visual languages.

**Key Characteristics:**

- Full-strength fluorescent color fields grounded by black ink and warm white.
- Approved campaign art and real product screens as primary evidence.
- Oversized display type paired with direct, compact interface copy.
- Sharp poster sections and minimally rounded working controls.
- One product-authentic motion signature: the LED marquee.

## Colors

The palette is a full-strength campaign set: fluorescent pink, electric blue, acid green, and electric cyan alternate in large fields while black ink and warm paper protect legibility.

### Primary

- **Fluorescent Pink:** Owns the campaign hero and high-energy feature fields.

### Secondary

- **Electric Blue:** Alternates with pink across full-bleed feature chapters.
- **Acid Green:** Signals selection, focus, LED output, and the local-first trust close.

### Tertiary

- **Electric Cyan:** Provides a cool selectable LED color without becoming a page-wide default.

### Neutral

- **Black Ink:** Grounds navigation, footer, buttons, text, and dark page bands.
- **Screen Black:** Creates the LED-matrix display field.
- **Control Surface:** Separates the working demo controls from the page background.
- **Warm Paper:** Supplies primary light text with less glare than pure white.
- **Pure White:** Remains an explicit LED color option.
- **Chapter Contrast:** White chapter copy sits directly on campaign art; contrast comes from the letterform stroke and restrained shadow.
- **Light Line:** Divides dark controls without introducing card chrome.

### Named Rules

**The Product-Specific Palette Rule.** This fluorescent palette belongs to Freezon Banner; do not use it to redefine Freezon Photo Vault or another product surface.

**The Letterform Contrast Rule.** White chapter copy sits directly on campaign art; use a fine ink stroke and restrained text shadow on the letterforms, never a backdrop over the image.

## Typography

**Display Font:** Banner Display (with PingFang SC and sans-serif fallback)
**Body Font:** Native system sans (Apple system, SF Pro Text, PingFang SC, Hiragino Sans GB, Microsoft YaHei)

Traditional Chinese display headings use `PingFang TC`, `Noto Sans CJK TC`, then `PingFang SC` so incomplete glyph coverage in the campaign display font cannot create mixed shapes within one phrase.

**Character:** The oblique display face reads like hand-painted event signage at large scale. The system stack keeps navigation, controls, factual claims, and multilingual copy calm and legible.

### Hierarchy

- **Display** (400, 84px, 0.94): Hero promise and LED output; scale down deliberately by breakpoint and locale.
- **Headline** (400, 76px, 0.98): Chapter and trust headings.
- **Title** (700, 24px, 1.2): Trust facts and compact section labels.
- **Body** (650, 16px, 1.55): Direct descriptions, generally held to 34-46 characters per line.
- **Label** (750, 13px, 0 letter spacing): Navigation, controls, and metadata; never add tracked uppercase styling.

### Named Rules

**The Direct Language Rule.** Public copy states the action and result directly; never substitute coined slogans or unexplained campaign phrases.

## Layout

Large imagery and color fields own the composition. Campaign chapters run full bleed inside a 1720px maximum stage; utility content uses a 1400-1480px working measure. Desktop chapter copy is centered in the quiet upper area of each artwork, below the sticky navigation safe area, with a single-line heading; the hero keeps its left-side campaign title field and the demo uses a wide uninterrupted stage. Each desktop chapter fills at least the viewport height so the next oversized heading does not intrude into the current screen. At 820px, text grids stack; at 720px, mobile campaign art takes over, controls wrap, and headings stay single-line with breakpoint-specific locale sizing. A 390px correction protects the narrowest supported layout.

Spacing is generous between chapters and compact inside controls. Do not convert the page into repeated feature cards or floating section containers.

## Elevation & Depth

The poster system is flat by default. Depth appears only where it explains interaction: the working demo panel receives a deep structural shadow, the primary button receives a restrained lift, and LED text emits a color-matched glow. Navigation and campaign chapters use no ambient shadow.

### Shadow Vocabulary

- **Button lift** (`0 14px 28px -16px rgba(8, 11, 13, 0.7)`): Separates a dark call to action from a fluorescent field.
- **Demo depth** (`0 34px 80px -36px rgba(0, 0, 0, 0.85)`): Establishes the live preview as a working product surface.
- **LED glow** (`0 5px 16px color-mix(in srgb, currentColor 52%, transparent)`): Connects the website demo to the app's luminous output.

**The Working Surface Rule.** Keep poster chapters flat; reserve elevation for controls and mechanisms the visitor can operate.

## Shapes

The dominant form language is rectangular and poster-sharp. Sections and chapter backdrops have square corners; buttons, fields, navigation selectors, and the demo shell use restrained 4-8px radii. Only color swatches and the downward chapter cue are circular. Borders are thin and functional, never decorative frames.

## Components

### Buttons

- **Shape:** Compact rectangular control with a restrained corner (4px) and a minimum 48px desktop height.
- **Primary:** Black ink on fluorescent fields with warm-paper text and 11px by 18px padding.
- **Hover / Focus:** Lift by 2px and invert to acid green; focus uses a 3px acid-green outline with a 3px offset.
- **Text link:** Underlined, direct, and visually secondary to the filled command.

### Cards / Containers

- **Corner Style:** The working demo alone uses the panel radius (8px); poster chapters remain unframed.
- **Background:** Control Surface surrounds a Screen Black LED stage.
- **Shadow Strategy:** Demo depth only; do not introduce a repeated card grid.
- **Border:** One translucent light line.
- **Internal Padding:** 22px on desktop and 16px on mobile.

### Inputs / Fields

- **Style:** Black ink field, warm-paper text, one translucent border, and a restrained corner (4px).
- **Focus:** Acid-green 3px outline with a 3px offset and acid-green caret.

### Navigation

Navigation is a full-width, nearly opaque black-ink bar with no blur or shadow. Links are compact system labels; hover and current states use acid green. The language selector is segmented, while mobile navigation collapses behind a square icon button.

### LED Marquee

The signature interaction is one continuous 13-second linear marquee across a black LED-dot field. Static mode centers and wraps a single message. Under reduced motion, remove animation and the duplicate message so the same content remains readable and stable.

### Feature Chapter Copy

White chapter copy sits centered in the upper quiet area of the campaign image with a fine dark letterform stroke and restrained shadow. The acid-green chapter uses black ink directly on the field and needs no treatment.

## Do's and Don'ts

### Do:

- **Do** lead with approved campaign artwork and real product screens at inspectable scale.
- **Do** use fluorescent colors as decisive page fields, balanced by black ink and warm paper.
- **Do** keep user-facing copy factual and direct about actions, controls, and results.
- **Do** preserve the static LED message when reduced motion is requested.

### Don't:

- **Don't** replace the campaign composition with a generic split hero, decorative card grid, or stock app mockup.
- **Don't** add a large color field behind chapter copy; keep contrast attached to the letterforms.
- **Don't** invent slogans, product behavior, testimonials, metrics, or download links.
- **Don't** apply the Banner palette or poster language to Freezon Photo Vault by default.
