# Design: openSUSE Project Brand Layer

**Date:** 2026-11-17
**Status:** Approved for implementation
**Site:** https://douglasdemaio.github.io/opensuse-branding/

## Goal

Add a project-level brand layer to the existing single-page branding guide. The guide already
documents the product/distribution "Color DNA" (Tumbleweed, Leap, MicroOS, Kalpa, Slowroll and
the parent openSUSE mark). The new layer documents the identity of the openSUSE **project /
community** itself — website, events, docs, swag, slides — without competing with product colors.

Concept: **products are the leaves, the project is the roots.** Product Color DNA stays bright and
saturated; the project palette uses deeper, grounded versions of the same hues anchored by the
heritage Pine navy. Geeko Green is the single bright color shared by both layers.

## Current state (verified)

- Plain HTML/CSS/JS, no build step, no Tailwind/DaisyUI. `index.html`, `css/style.css`,
  `js/main.js`, `images/*.svg`, `Flyers/`.
- Global font is Inter (Google Fonts). Dark is the default theme; `prefers-color-scheme: light`
  overrides global color vars.
- Logo fills confirmed by inspecting SVG source:
  - `images/openSUSE.svg` — `#42cd42` / `#73ba25` strokes (Geeko Green family)
  - `images/Tumbleweed.svg` — `#20caa3` (Turquoise Teal)
  - `images/Leap.svg` — `#d4cb1b` (Yarrow Yellow)
  - `images/microOS.svg` — `#a498ff` (chameleon) + `#173f4f` (Pine wordmark)
  - `images/Kalpa.svg` — `#25ac95` (its own jade, per its own brand)
  - `images/Slowroll.svg` — `#ff5b45` (Radish Red)
  - Butterfly Blue `#00c8ff` exists in DNA but is not used by any product logo.
  - `#ffffff`, `#000000`, `#d1d1d1` in SVGs are Inkscape pagecolor/bordercolor/deskcolor
    metadata, not fills.
- `Flyers/tools/fonts/SUSE-Bold.ttf` and `SUSE-Regular.ttf` already exist for flyer generation;
  they are left untouched.

## Decisions (confirmed with user)

1. **Typography scope:** the whole guide switches to SUSE (decision: "Whole guide switches to
   SUSE"). Product sections keep their colors/logos/assets; only the guide's typeface changes.
   Kalpa's name, SVG and `#25ac95` statement remain verbatim.
2. **DaisyUI delivery:** standalone `css/daisyui-themes.css` containing both real DaisyUI v5
   `@plugin "daisyui/theme"` definitions and a plain-CSS `[data-theme=…]` mirror so samples render
   today without Tailwind. No CDN or build step added.
3. **Purpose (user clarification):** the point is that people in the openSUSE community building
   an openSUSE-related website can make it look similar in style, colors, branding and CSS.
   Therefore the tokens, themes and components are shipped as a single drop-in stylesheet
   `css/project-brand.css` that bundles `css/daisyui-themes.css`; a community site only needs to
   link that one file. The new section includes a "Use this on your own site" copy-paste block.

## Architecture / file changes

### `index.html`
- Replace Inter font link with variable SUSE + SUSE Mono (weights 300/400/600, and 400 mono).
- Page nav: insert separator `<li class="page-divider" aria-hidden="true">` and
  `<li><a href="#project-brand">Project Brand</a></li>` immediately after the Color DNA link.
- Insert new `<section id="project-brand" class="project-brand">` between Color DNA and Hierarchy.
  Structure:
  1. `<h2>Project Brand</h2>` + roots/leaves lede; two-card concept comparison joined by a
     Geeko-green bridge labeled "the shared signal".
  2. Palette groups: Primary (Pine, Geeko Green, Deep Geeko); Secondary (Jade Depth, Deep Plum,
     Deep Butterfly, Bagel Beige); Neutrals (Ink, Slate, Fog, Mist). Each swatch: block with
     25/50/75/90% tint steps, name, uppercase hex, `rgb(…)` value, role text.
  3. Typography specimen: display 300 "Have a lot of fun." (Geeko period), headings 600,
     body 400/1.6, SUSE Mono; download links to
     https://fonts.google.com/specimen/SUSE, https://fonts.google.com/specimen/SUSE+Mono,
     https://github.com/SUSE/suse-font.
  4. Do's / Don'ts two-column card grid, including the explicit rules: Geeko Green never as text
     on white; product colors only for a specific distribution; no recoloring product logos with
     project colors; no Slate on Pine.
  5. Light and dark samples: `.pb-sample[data-theme="openSUSE-light"]` and
     `[data-theme="openSUSE-dark"]`, each a hero with "Have a lot of fun.", Geeko period, and a
     Geeko CTA with dark `#0B2A12` text. Product logos shown as white knockouts on Pine and as
     full-color marks on white sticker chips (Fog ring + soft ink shadow) on Mist.
  6. "Use this on your own site" card with a copy-paste `<link>` snippet for
     `css/project-brand.css`, the SUSE Google Fonts link, and a list of available `--os-*`
     properties and DaisyUI theme names.
  7. Contrast ledger table with all checked pairs and ratios; Geeko-on-white 2.09:1 listed as the
     prohibited pair.
- Update the Guidelines "Typography" quick-reference list from Inter to SUSE/SUSE Mono.
- No changes to product section markup, logo SVGs, flyer files, or Kalpa content.

### `css/project-brand.css` (new — the drop-in layer)
- Contains the `--os-*` project tokens in `:root` (see token table), all `.project-brand` / `.pb-*`
  styles (swatches, tint strip, specimen, do/don't grids, sample heroes, logo surfaces, contrast
  table, code snippet), a 768px responsive block, and `@import url("daisyui-themes.css");` so
  linking this one file gives a community site tokens + themes + components.
- All references to site-specific variables use fallbacks (e.g. `var(--card, #ffffff)`,
  `var(--ink, var(--os-ink))`) so the components render standalone as well as inside this guide.
- `--os-teal` is the literal `#20caa3` here (not an alias of `--b2`) so it works without
  `style.css`.

### `css/style.css`
- Keep existing `--b1`…`--b6`, `--geeko-green`, etc. and global layout variables (`--bg`,
  `--card`, `--ink`, `--muted`, …) exactly as they are so product sections are visually unchanged.
- Change `body` font-family to `SUSE, …` and heading weights to 600.
- Add the page-nav divider / green dot that separates the project-level nav entry.
- Site chrome already uses Pine in the universe toolbar; the new section demonstrates the rest
  of the project palette locally.

### `css/daisyui-themes.css` (new)
- `@plugin "daisyui/theme"` blocks for `openSUSE-light` and `openSUSE-dark` with all DaisyUI v5
  semantic tokens (`base-100/200/300`, `base-content`, `primary`, `secondary`, `accent`, `neutral`,
  `info`, `success`, `warning`, `error` and each `-content`).
- Mirrored `[data-theme="openSUSE-light"]` / `[data-theme="openSUSE-dark"]` blocks setting the
  same `--color-*` names, plus `--os-link`, so samples work without Tailwind.
- Bundled by `css/project-brand.css` via `@import` (which `index.html` links after `style.css`).

### `js/main.js`
- Extend the swatch click-to-copy handler to include `.pb-swatch` (or make it generic via a shared
  class) so the new swatches copy their hex too. Everything else unchanged.

### `README.md`
- Add a "Project Brand" note: roots/leaves concept, a "Reuse it on your own openSUSE-related site"
  snippet linking `css/project-brand.css`, the `--os-*` token names, the two DaisyUI theme names,
  and the note that the guide font is SUSE.

## Token table

| Token | Hex | RGB | Role |
|---|---|---|---|
| `--os-pine` | `#173F4F` | 23, 63, 79 | Main brand dark; headers/footers/dark base/print |
| `--os-geeko` | `#42CD42` | 66, 205, 66 | Shared signal; buttons/fills/accents; never text on white |
| `--os-geeko-deep` | `#1B7F36` | 27, 127, 54 | Text/links on light backgrounds |
| `--os-geeko-ink` | `#0B2A12` | 11, 42, 18 | Text on Geeko Green fills |
| `--os-jade` | `#0E7C6B` | 14, 124, 107 | Section accents, secondary buttons (from Turquoise Teal) |
| `--os-plum-deep` | `#5B4FC4` | 91, 79, 196 | Charts, event/community highlights (from Plum Purple) |
| `--os-butterfly-deep` | `#0077B6` | 0, 119, 182 | Info states, charts, diagrams (from Butterfly Blue) |
| `--os-bagel` | `#FFF8EE` | 255, 248, 238 | Warm paper background; sticker borders |
| `--os-ink` | `#0F2A35` | 15, 42, 53 | Body text on light; deepest dark surface |
| `--os-slate` | `#516F7B` | 81, 111, 123 | Secondary text/captions (not on Pine) |
| `--os-fog` | `#C5CFD3` | 197, 207, 211 | Borders/dividers; muted text on Pine |
| `--os-mist` | `#EEF3F4` | 238, 243, 244 | Light page background; cards |
| `--os-teal` | `#20CAA3` | 32, 202, 163 | Dark-mode links (existing DNA hue alias) |

## DaisyUI theme values

**openSUSE-light:** base-100 `#FFFFFF`, base-200 `#EEF3F4`, base-300 `#C5CFD3`,
base-content `#0F2A35`; primary `#42CD42` / content `#0B2A12`; secondary `#0E7C6B` / content
`#FFFFFF`; accent `#5B4FC4` / content `#FFFFFF`; neutral `#173F4F` / content `#FFF8EE`;
info `#0077B6` / content `#FFFFFF`; success `#42CD42` / content `#0B2A12`; warning `#D4CB1B` /
content `#0F2A35`; error `#FF5B45` / content `#0F2A35`; link `#1B7F36`.

**openSUSE-dark:** base-100 `#173F4F`, base-200 `#0F2A35`, base-300 `#516F7B`,
base-content `#FFF8EE`; primary `#42CD42` / content `#0B2A12`; secondary `#20CAA3` / content
`#0F2A35`; accent `#5B4FC4` / content `#FFFFFF`; neutral `#0F2A35` / content `#FFF8EE`;
info `#20CAA3` / content `#0F2A35`; success `#42CD42` / content `#0B2A12`; warning `#D4CB1B` /
content `#0F2A35`; error `#FF5B45` / content `#0F2A35`; link `#20CAA3`.

## Accessibility / contrast ledger (computed, WCAG 2.1)

All ratios computed from relative luminance. 4.5:1 required for normal text, 3:1 for large text.

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| White `#FFFFFF` | Pine `#173F4F` | 11.29:1 | AA |
| Bagel Beige `#FFF8EE` | Pine | 10.70:1 | AA |
| Fog `#C5CFD3` | Pine | 7.12:1 | AA |
| Turquoise Teal `#20CAA3` (dark links) | Pine | 5.40:1 | AA |
| Geeko Green `#42CD42` | Pine | 5.40:1 | AA |
| Geeko ink `#0B2A12` | Geeko Green | 7.42:1 | AA |
| Geeko Green | White (prohibited) | 2.09:1 | FAIL — never use |
| Deep Geeko `#1B7F36` | White | 5.08:1 | AA |
| Deep Geeko | Mist `#EEF3F4` | 4.54:1 | AA (borderline; prefer White) |
| White | Jade Depth `#0E7C6B` | 5.10:1 | AA |
| White | Deep Plum `#5B4FC4` | 6.25:1 | AA |
| White | Deep Butterfly `#0077B6` | 4.87:1 | AA |
| Ink `#0F2A35` | White | 14.97:1 | AA |
| Ink | Mist | 13.37:1 | AA |
| Slate `#516F7B` | White | 5.37:1 | AA |
| Slate | Mist | 4.80:1 | AA |
| Slate | Pine | 2.10:1 | FAIL — do not use |
| White | Ink `#0F2A35` | 14.19:1 | AA |
| Pine | Mist | 10.09:1 | AA |
| `#0F2A35` on warning `#D4CB1B` | — | 8.81:1 | AA |
| `#0F2A35` on error `#FF5B45` | — | 4.87:1 | AA |

Product-logo visibility: on Pine, white-knockout marks give 11.29:1. On Mist, full-color marks
are placed on white sticker chips with a Fog ring and soft ink shadow; logotypes are exempt from
WCAG 1.4.11 non-text contrast, and the chip/shadow provides edge definition.

## Testing / acceptance

- Serve locally (`python3 -m http.server`) and inspect both light and dark sample panels.
- Verify no changes to `images/*.svg`, `Flyers/**`, product-section markup or Kalpa copy
  (`git diff --stat`, `git status`).
- Verify every text/background pair in the ledger renders as specified and no new pair falls
  below 4.5:1 (3:1 for large text).
- Verify click-to-copy works on both existing and new swatches.
- Verify both `[data-theme]` blocks style their sample panels and that DaisyUI `@plugin` blocks
  are syntactically complete for future Tailwind/DaisyUI consumption.
