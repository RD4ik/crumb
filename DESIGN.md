---
name: Crumb
description: Contemporary bread campaign with an immediately shoppable open shelf
colors:
  blue: "#203cc4"
  orange: "#ee693f"
  ground: "#e9edef"
  dark: "#202125"
  rule: "#a8b4c7"
  field: "#f8fafc"
  error: "#a82e24"
typography:
  display:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "22.4vw"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Golos Text, sans-serif"
    fontSize: "clamp(48px, 5.5vw, 80px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Golos Text, sans-serif"
    fontSize: "23px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Golos Text, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Golos Text, sans-serif"
    fontSize: "16px"
    fontWeight: 500
rounded:
  field: "8px"
  feedback: "12px"
  dialog: "16px"
  add-pill: "28px"
  action-pill: "32px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark}"
    typography: "{typography.label}"
    rounded: "{rounded.action-pill}"
    padding: "16px 24px"
    height: "56px"
  button-add:
    backgroundColor: "transparent"
    textColor: "{colors.ground}"
    rounded: "{rounded.add-pill}"
    padding: "12px 18px"
    height: "48px"
  button-add-selected:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.blue}"
    rounded: "{rounded.add-pill}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.blue}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "54px"
  filter:
    backgroundColor: "transparent"
    padding: "10px 0"
    height: "44px"
---

# Design System: Crumb

## Overview

**Creative North Star: "The Bread Campaign"**

Monumental lowercase lettering and isolated bread photographs make a direct, contemporary bakery campaign. Cool grey provides air; cobalt becomes both ink and a full section field; warm orange carries purchase actions and the process story. Bread supplies the texture while rules and open space organize the interface.

Unbounded is reserved for the brand signature. Golos Text carries Cyrillic headlines, product information and shopping controls. The visual system supports an illustrative storefront with a local basket and downloadable pickup list; demo status remains explicit at the point of ordering.

**Key Characteristics:**
- Oversized lowercase brand with photographic overlap.
- Open product shelves, fine dividers and asymmetric desktop spans.
- Large rounded shopping controls with visible state feedback.
- Responsive recomposition and reduced-motion support.

## Colors

### Primary
- **Campaign Cobalt:** brand, main page ink, catalog and footer fields.

### Secondary
- **Oven Orange:** purchase controls, addition feedback and the process section. Use dark text on this field.

### Neutral
- **Photographic Grey:** main ground, dialogs and reversed catalog text.
- **Charcoal:** reading ink on orange.
- **Cool Rule:** drawer separators.
- **Field White:** input and select surfaces.
- **Brick Error:** invalid-field border and explanatory text.

**The Bread Object Rule.** Let isolated product photography meet the section field directly; use the bread silhouette rather than a rectangular photo tile.

## Typography

**Display Font:** Unbounded, sans-serif. **Body Font:** Golos Text, sans-serif. Both are locally loaded from `src/fonts-v2.css`.

The frontmatter records the principal desktop roles. Brand scales with viewport width and is capped on wide screens. Hero copy uses a compact Golos Text heading (`clamp(48px, 4.5vw, 68px)`, weight 600, line-height 0.98); section headings vary by context. Product descriptions use (15px), line-height (1.6). Prices use tabular numerals. Small metadata stays secondary to product names and actions.

**The Brand Voice Rule.** Reserve Unbounded for the lowercase brand; use Golos Text for headlines and all transactional reading.

## Layout

Desktop sections use (40px) side gutters, transitioning through (28px), (24px), (20px), then (16px) on the narrowest screens. Above (1700px), content gutters center the principal section content around a (1560px) width. The hero is an independent layered composition with a large wordmark behind a rotated product object, compact copy and a ruled quick-add rail.

The catalog uses twelve columns with (48px) gaps: the first pair spans seven/five columns, subsequent products four each, and the final paired product occupies a full row. At (800px) products become two columns; at (600px) they stack. Filtering simplifies the desktop grid to two columns. Mobile recomposes the hero into a readable sequence of wordmark, loaf, heading and purchase rail. The footer invitation stacks at the mobile breakpoint, with the action below the heading. The cart is a right-edge drawer (540px), capped at viewport width, with fixed heading/summary and a scrolling body.

## Elevation & Depth

Main sections and product shelves are flat. Transparent photographic objects use soft drop shadows rather than card shadows. The product dialog, cart drawer, toast and disclosed mobile navigation receive soft elevation; the modal backdrop is a translucent navy wash. Their exact shadows and timings live in the sidecar.

**The Open Shelf Rule.** Keep catalog products flat and separated by space and thin rules; reserve panel elevation for temporary overlays.

## Shapes

Primary actions and outlined shopping controls are pills; icon actions are circles. Inputs and cart thumbnails have small curved corners; dialogs use a softer corner, with the cart rounded only along its left edge. Thin rules divide shelves, FAQ entries and cart content. Product photographs retain their natural alpha silhouettes.

## Components

### Buttons
Orange primary actions use dark ink and a minimum height (56px). Outlined add controls use the reversed catalog colors, become orange on hover, and switch to grey/cobalt with a count and checkmark once selected. The hero uses a circular orange add action. Active primary/add presses translate down (2px). Focus uses a (2px) current-color outline, offset (4px) on buttons.

### Chips
Category filters are unboxed text tabs with counts, minimum height (44px), and a fine underline for the active or hovered state. They are not filled pills.

### Cards / Containers
Catalog products are open shelf entries: object image, linked name and weight, description, then price and add action. They carry no enclosing panel. The detail dialog pairs a contained product image with information and one full-width action; it stacks on mobile.

### Inputs / Fields
Visible labels sit above pale input/select fields. Fields use a thin cool border, large readable text and blue caret. Invalid fields add brick border and an explanatory message. Global keyboard focus uses a (2px) current-color outline with (5px) offset.

### Navigation
Desktop links reveal a fine underline on hover. At (600px), a menu control discloses a vertical grey panel. The basket retains a count; icon actions use stroked SVG and accessible names.

### Cart and feedback
The native dialog drawer preserves shopping context. Quantity controls use bordered pill geometry and tabular numbers. A transient orange status toast confirms additions. Checkout and completion explicitly describe the local demo flow and summary download.

Product hover rotates the image slightly and raises it (8px) over (0.7s). Drawer entrance lasts (0.4s); ordinary control transitions last (0.2s). Reduced-motion preference removes transitions, animations and smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** keep product silhouettes and crust texture large and legible.
- **Do** preserve visible keyboard focus, named icon actions and reduced-motion behavior.
- **Do** show quantity feedback immediately and keep the demo-order disclosure beside checkout.

### Don't:
- **Don't** put raised card shells around every catalog product.
- **Don't** use the display wordmark face for dense shopping controls.
- **Don't** present illustrative products, prices or orders as verified business facts.
