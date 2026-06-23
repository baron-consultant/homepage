# Software Header/Footer Integration Note

## Goal

- Connect TOVA, GAIA, and EGBIM pages to the shared Baron header and footer.
- Preserve each product page's current content UI, animations, and page-specific JavaScript behavior.
- Remove only duplicated local common layout blocks such as product-local header, sitemap header, and local footer structures.

## Shared Baron Base

- KO loader: `www/baron/assets/js/common.js`
- EN loader: `www/baron/assets/js/common_eng.js`
- KO includes: `www/baron/_include/header.html`, `www/baron/_include/footer.html`, `www/baron/_include/nav.html`
- EN includes: `www/baron/_include/eng/header.html`, `www/baron/_include/eng/footer.html`, `www/baron/_include/eng/nav.html`

## Preservation Rules

- Keep product-specific CSS and page content markup intact unless a conflict is proven.
- Keep product-specific JS files for animations, tabs, popups, forms, and content interactions.
- Remove only local header/footer DOM and local sitemap DOM when Baron include replaces that responsibility.
- Avoid changing content section class names used by page JS.
- Validate one representative page per product/language before expanding changes.

## Product Notes

### TOVA

- Current pages still contain local header and local sitemap markup.
- Page-specific JS is mixed with shared product JS.
- `popup.js` appears to bind popup close buttons and sitemap close behavior.
- First integration target: `www/baron/en/tova/value.html`

### GAIA

- Structure appears simpler than TOVA.
- Likely lower risk because local header-specific JS dependency is smaller.
- Integrate after TOVA sample pattern is confirmed.

### EGBIM

- Has the heaviest legacy asset set.
- Needs the most conservative integration: inject Baron common layout while preserving existing product JS and CSS.
- Integrate after TOVA and GAIA pattern is stable.

## Execution Order

1. TOVA sample page dependency split.
2. TOVA sample header/footer integration.
3. TOVA sample browser validation.
4. Expand TOVA pattern.
5. Integrate GAIA.
6. Integrate EGBIM.

## Task 1 Scope

- Use `www/baron/en/tova/value.html` as the sample page.
- Identify which DOM blocks are local header-only and removable.
- Identify which JS handlers must remain because they support content UI.
- Prepare a minimal edit that swaps only the common layout layer.

## Task 1 Findings

### TOVA EN Sample Control Point

- Sample page: `www/baron/en/tova/value.html`
- The real integration control point is not the HTML file alone.
- `www/baron/en/tova/js/common.js` already contains Baron header and footer injection logic.
- `setupBaronHeaderBrand()` is registered on `DOMContentLoaded`.
- `setupBaronFooterBrand()` is registered on `DOMContentLoaded`.
- This means the local header/footer markup in the HTML is currently acting as a shell or fallback, not the best long-term source of truth.

### TOVA EN Sample DOM That Is Safe To Replace

- Local top header block: `<header class="js__header"> ... </header>`
- Local sitemap block: `<div class="popup_sitemap" id="sitemap"> ... </div>`
- Local footer presentation block inside `<footer id="footer"> ... </footer>`

### TOVA EN Sample UI That Must Be Preserved

- Privacy popup DOM and privacy/agreement tab switching in `popup.js`
- Product content animation and scroll interactions in `value.js`
- Floating contact button and content section markup used by product CSS/JS
- Family site toggle and top button behavior currently handled in product `common.js`

### TOVA EN Sample JS Coupling Notes

- `popup.js` depends on `.btn_close`, `.btn_map_close`, `.popup_sitemap`, `.tab_privacy`, `.tab_agreement`.
- `value.js` is content-focused and does not appear to depend on the local product header structure.
- `common.js` includes legacy `sitemap()` behavior and also a newer Baron-brand injection path.
- Because of that overlap, the first real cleanup target is duplicated header/sitemap responsibility inside product `common.js` and page HTML.

### Current Direction

- For TOVA first, keep product page JS files.
- Let product `common.js` be the bridge layer that renders Baron common header/footer.
- Remove duplicated local header/sitemap/footer markup only after confirming the Baron injection path is the single owner.
- Do not touch content section structure unless a concrete JS dependency requires it.

## TOVA EN Sample Progress

- Sample page updated: `www/baron/en/tova/value.html`
- Local duplicated header markup was reduced to an empty `header.js__header` shell.
- Local duplicated sitemap block was removed from the HTML sample page.
- Local duplicated footer markup was reduced to an empty `footer#footer` shell.
- TOVA EN `common.js` now remains the single owner of rendering the Baron-style header/footer on the sample page.
- TOVA-specific footer access points were preserved in generated footer markup:
	- `Privacy Policy`
	- `Terms of Service`
	- TOVA cafe link

## TOVA EN Sample Validation

- Header rendered as Baron shell.
- Footer rendered as Baron shell.
- Header sitemap button opens generated sitemap.
- Privacy popup function still opens the existing popup DOM.
- Product content area remained intact.