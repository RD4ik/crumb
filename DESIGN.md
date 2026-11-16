---
name: Crumb
description: Butter-paper artisan bakery storefront concept
colors:
  paper: "#f6f3e6"
  butter: "#f2edcf"
  green: "#294d3d"
  ink: "#263a2e"
  muted: "#697065"
  line: "#d9dccd"
  white: "#fffdf5"
  green-hover: "#173729"
  error: "#a63f33"
typography:
  display:
    fontFamily: "Prata, Georgia, serif"
    fontSize: "clamp(48px, 5.4vw, 83px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Prata, Georgia, serif"
    fontSize: "clamp(30px, 3.2vw, 48px)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 500
rounded:
  control: "4px"
  product: "5px"
  dialog: "8px"
  pill: "24px"
  circle: "50%"
spacing:
  compact: "8px"
  small: "12px"
  medium: "16px"
  roomy: "20px"
  large: "24px"
  group: "28px"
  block: "32px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.green}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-add:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
  filter:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  filter-active:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 14px"
---

# Design System: Crumb

## Overview

**Creative North Star: "The Morning Bakery Counter"**

Butter wrapping paper and bottle-green ink frame close bread photography. Prata supplies the quiet, expressive lettering; Manrope keeps shopping controls precise. Space and thin rules organize the page without raised card shells.

This is an illustrative concept, not a real bakery. Product facts, prices and the story are demonstration content; the cart creates a local pickup list without payment or order transmission. This document records the shipped React storefront, not a commercial identity supplied by a business.

**Key Characteristics:**
- Warm paper surfaces and dark green ink.
- Large serif headings beside restrained utility type.
- Close food photography, thin rules and small corner radii.
- Immediate shopping feedback and restrained, optional motion.

## Colors

The palette reads as wrapping paper and printed ink; frontmatter values are normative.

### Primary
- **Bottle Green** (`green`): filled actions, selected filters, announcement and closing panels.
- **Deep Green** (`green-hover`): filled action hover state.

### Neutral
- **Wrapping Paper** (`paper`): page, quick-add strip and dialogs.
- **Butter Paper** (`butter`): hero field.
- **Green Ink** (`ink`): primary text.
- **Soft Olive Ink** (`muted`): descriptions and metadata.
- **Paper Rule** (`line`): control outlines and separators.
- **Cream White** (`white`): input fill and text on dark controls.
- **Brick Error** (`error`): validation text and invalid input border.

**The Paper and Ink Rule.** Use green for an action or a deliberate full-width field; keep product cards on the page surface.

## Typography

**Display Font:** Prata, Georgia, serif. **Body Font:** Manrope, sans-serif. Both are locally hosted with `font-display: swap`; display uses regular weight, utility text uses regular, medium and semibold.

### Hierarchy
- **Display:** the frontmatter scale drives the hero. Desktop grows to (88px) above the wide breakpoint; tablet uses `clamp(36px, 6vw, 48px)` and mobile `clamp(43px, 11.7vw, 64px)`.
- **Headline:** the frontmatter role covers section headings; story and closing headings have larger contextual scales.
- **Title:** semibold product names, reduced to (14px) at tablet and (12px) on mobile.
- **Body:** the recorded role matches story and FAQ prose. Hero copy is (14px), line-height (1.8), max-width (390px); product descriptions are (12px), line-height (1.8), then (11px) on mobile.
- **Label:** medium utility type for buttons and desktop navigation. Metadata remains subordinate; small sizes are contextual, not a universal body scale.

**The Two Voices Rule.** Keep expressive headings in Prata and transactional controls in Manrope.

## Layout

Desktop gutters are (4.5%); mobile gutters are (5%). Sections use the recorded section spacing, reduce to (64px) at tablet and (48px) on mobile. Above (1600px), the header, hero and sections use `max(4.5%, calc((100vw - 1480px) / 2))` gutters.

The catalog has three equal columns, then two at (800px), with desktop gaps (40px 24px) and mobile gaps (32px 16px). The hero begins at (47% / 53%), adjusts at (1100px) and (800px), then stacks at (600px). At tablet widths the photograph stays inside its column. Story and FAQ sections also stack at mobile size. The cart is a right-edge drawer (500px), capped by viewport width.

## Elevation & Depth

Main content is flat: background changes, photographic crops and thin rules establish depth. Soft shadows are reserved for transient layers. The product dialog uses `0 20px 80px #172d2230`, the cart uses `-12px 0 64px #172d2220`, the toast uses `0 8px 28px #20332520`, and mobile navigation uses `0 12px 16px #263a2e0a`. Dialog backdrops use a green translucent wash and (3px) blur.

**The Flat Counter Rule.** Preserve flat product cards; use elevation to distinguish temporary overlays.

## Shapes

Controls are small rounded rectangles; product images use the product radius, reducing to the control radius on mobile. Dialogs have a softer corner. Filters are pills; icon actions, cart counts and the ingredient seal are circular. Borders are thin rather than heavy frames. Desktop catalog images use aspect ratio (1.22), mobile images (0.86).

## Components

### Buttons

Primary controls are green with cream text, minimum height (52px), reduced to (48px) at tablet. Light controls reverse the paper/green relationship. Outline add controls are compact rectangles on desktop; mobile shows an icon-only circle (44px). Active presses move down (1px). Hover changes fill over (0.2s).

### Chips

Catalog filters have thin paper rules, transparent fill and a green selected state. Unselected hover uses a pale olive fill. They show category counts, not promotional labels.

### Cards / Containers

Products have no outer panel or shadow. The photographic surface clips a gently curved image; title and weight share a row, followed by description, price and add action. The quick-add strip is a paper rectangle over the hero photo. Product badges carry actual catalog metadata.

### Inputs / Fields

Name and pickup fields share the input token. Labels remain visible above controls. Placeholder ink is subdued but readable. Invalid input uses the error color plus an explanatory message. The global keyboard focus ring is (2px) green with (5px) offset; buttons use (3px) offset. Primary buttons use an olive focus outline.

### Navigation

Desktop links are medium Manrope with a fine underline that reveals on hover. At (600px), navigation becomes a disclosed vertical paper panel. The basket count remains visible. Icons are consistent stroked SVGs; utility icons do not replace accessible action names.

### Cart and feedback

The native dialog drawer has a fixed heading and summary, with a scrollable body. Quantity controls retain bordered geometry and tabular numbers. A green status toast confirms addition. Checkout visibly discloses that the list stays local; completion offers a text download. Empty-cart and success messages use Prata headings.

Image hover scales to (1.035) over (0.7s); drawer entrance takes (0.35s) with the shared easing. Reduced-motion preference removes animation, transitions and smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** keep bread photography close and large enough to show crust texture.
- **Do** use the Paper and Ink Rule, Two Voices Rule and Flat Counter Rule.
- **Do** preserve visible keyboard focus, readable placeholder text and reduced-motion behavior.
- **Do** disclose the local demonstration flow wherever an order could appear to be submitted.

### Don't:
- **Don't** add raised shells around every catalog product.
- **Don't** use Prata for dense transactional controls.
- **Don't** let a tablet photograph obscure the hero text.
- **Don't** present illustrative product claims as verified business facts.
