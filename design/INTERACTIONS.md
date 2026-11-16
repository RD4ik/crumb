# Browser functional verification — Crumb v2

Verified using CUA in the actual local site, not source inspection:

- Mobile navigation opens, shows3links, closes after selecting catalog.
- Pastry filter shows2actualproducts.
- Product dialog opens with readable composition, ingredients and allergens.
- Adding croissant updates basket; increasing to2 gives380 ₽.
- Empty name produces inline error and focuses name field.
- Name Алекс, pickup in2days, time11:00–13:00 accepted in local demonstration.
- Completion explicitly says no order transmission/payment.
- Downloaded text file contains2croissants and total380 ₽.
- Reload preserves2items; removing product gives visible empty state.
- Empty-state return control opens catalog.
- FAQ expands.
- Console error/warning log empty during final interaction run.
- Responsive captures1440×1000,768×1024,390×844,320×740. Narrow document has no horizontal overflow; all images loaded.
- Strict TypeScript and Vite production build passed.
- npm audit after image tooling update reports0vulnerabilities.

Evidence: mobile-product.jpg, mobile-cart.jpg, mobile-error.jpg, mobile-checkout.jpg, mobile-success.jpg, mobile-empty.jpg. Native mobile screenshots capture the actual top-layer dialogs; large full-page captures show the layout across all sections.
