# Branding Guidelines section redesign — design

Date: 2026-11-20
Status: Approved for implementation planning
Local checkout: `/home/douglas/GitHub/branding-guidelines`
Target remote: `https://github.com/douglasdemaio/opensuse-branding.git`

## Objective

Rework the openSUSE Adaptive Branding guide so the product palette, print equivalents, practical guidance, and logo assets are easier to find and use. Deliver the work as two stacked branches and open two pull requests against `douglasdemaio/opensuse-branding`.

## Decisions

- Rename the user-facing `Color DNA` section to **Flavor Brand** and move it directly under **Project Brand**.
- Rename the concept card `Leaves · product Color DNA` to **New · Flavor Brand**; keep **Roots · Project Brand**.
- Add official Pantone equivalents from the [openSUSE Artwork brand page](https://en.opensuse.org/openSUSE:Artwork_brand) to the six Flavor Brand swatches.
- Add gradient guidance based on the approved rule: use adjacent hues; avoid complementary/opposite pairs.
- Split the existing `Light & dark in practice` and `Product logos on project backgrounds` blocks out of Project Brand into a new **In Practice** section with its own h2.
- Keep Typography inside In Practice as an h3 with `id="typography"`, and add a `Typography` hot link in the page-section nav.
- Combine **Logo Gallery** and **Project Hierarchy** into one **Logo Gallery / Hierarchy** section above Asset Guidelines, with a single h2 and no visual change to the cards or tree.
- Make logo images copy a PNG version of the logo to the clipboard, with an SVG-URL text fallback.
- Push two stacked branches and open two PRs against `douglasdemaio/opensuse-branding`, one per branch.

## Non-goals

- No changes to the SUSE typography system, DaisyUI themes, or flyer downloads.
- No redesign of the logo gallery cards or hierarchy tree.
- No removal of generic body-copy uses of the term “Color DNA” outside the renamed section label and concept card.
- No pushing to the existing `origin` or `upstream` remotes; the delivery target is the new `opensuse-branding` remote.

## Branch and PR plan

1. `brand/flavor-brand-in-practice` from `opensuse-branding/master`
   - Commit message: `feat: add flavor brand and in practice sections`
2. `brand/logo-hierarchy-copy` from `brand/flavor-brand-in-practice`
   - Commit message: `feat: combine logo gallery and add image copy`

The target repository has a different commit history from the local `branding-guidelines` checkout even though its `index.html`, CSS, JS, and README content currently match. Do not branch from local `master`; branch from the fetched target `master` so the PRs show only the intended changes. The design-spec commit on local `master` stays local and is not part of either PR.

Add a remote named `opensuse-branding` pointing to `https://github.com/douglasdemaio/opensuse-branding.git` if it does not already exist, then fetch it before creating branches. Push both branches to that remote and open PR 1 first, then PR 2 with `brand/flavor-brand-in-practice` as its base. The second branch is stacked so the final nav labels and section order do not need to be duplicated or reconciled.

## PR 1 — Flavor Brand and In Practice

### Page structure

Intermediate order after PR 1:

1. Home
2. Project Brand
3. **Flavor Brand** — moved from its current position after Logo Gallery
4. **In Practice** — new section
5. Logos — still separate in PR 1
6. Asset Guidelines
7. Flyers & Downloads
8. Branding in Action
9. Hierarchy — still separate in PR 1
10. Footer

Final order after PR 2:

1. Home
2. Project Brand
3. Flavor Brand
4. In Practice
5. **Logo Gallery / Hierarchy**
6. Asset Guidelines
7. Flyers & Downloads
8. Branding in Action
9. Footer

### Section details

**Project Brand**

- Keep the `Project Brand` h2 and Roots/New concept layout.
- Change only the first concept-card label from `Leaves · product Color DNA` to `New · Flavor Brand`.
- Keep `Roots · Project Brand` unchanged.
- Remove the Typography, Light & dark, and Product logos blocks from this section.

**Flavor Brand**

- Rename the section id from `color-dna` to `flavor-brand`.
- Rename the h2 from `Color DNA` to `Flavor Brand`.
- Keep the section lead copy and the six existing swatches.
- Add one Pantone line beneath each hex value:
  - Geeko Green `#42cd42` — Pantone `802 C`
  - Turquoise Teal `#20caa3` — Pantone `3385 C`
  - Yarrow Yellow `#d4cb1b` — Pantone `611 C`
  - Radish Red `#ff5b45` — Pantone `171 C`
  - Plum Purple `#a498ff` — Pantone `271 C`
  - Butterfly Blue `#00c8ff` — Pantone `2985 C`
- Add a source link labeled `Official palette and Pantone values ↗` pointing to `https://en.opensuse.org/openSUSE:Artwork_brand`.
- Add a compact gradient guidance block after the swatches. It must:
  - Recommend adjacent-hue pairs (for example Geeko↔Teal, Teal↔Geeko, Yarrow↔Orange, Plum↔Butterfly).
  - Explicitly discourage complementary/opposite pairs (for example Geeko↔Plum, Yarrow↔Butterfly, Radish↔Teal).
  - Recommend two-color gradients and the existing bottom-left → top-right flow for wallpapers.
  - Use the existing card/spec-tag visual language.

**In Practice**

- Add a new section with id `in-practice` and h2 `In Practice`.
- Move the following blocks into it, preserving their existing markup and styles:
  - `Typography / Font` as an h3 with `id="typography"` and the existing specimen + download links.
  - `Light & dark in practice` as an h3 with the existing two theme samples and note.
  - `Product logos on project backgrounds` as an h3 with the existing Pine and Mist logo surfaces.
- Add `In Practice` and `Typography` entries to the page-section nav. `Typography` links to `#typography`.

### Navigation

PR 1 nav labels:

`Home · Project Brand · Flavor Brand · In Practice · Typography · Logos · Guidelines · Flyers · Branding in Action · Hierarchy`

PR 2 final nav labels:

`Home · Project Brand · Flavor Brand · In Practice · Typography · Logo Gallery / Hierarchy · Asset Guidelines · Flyers · Branding in Action`

The active-section script in `js/main.js` must be extended so nav links can target either a `section[id]` or another element with an id (specifically `#typography`). It must not break the existing section-highlight behavior.

## PR 2 — Logo Gallery / Hierarchy and image copy

### Combined section

- Merge the `logos` and `hierarchy` sections into one section with id `logo-gallery-hierarchy`.
- Use a single h2: `Logo Gallery / Hierarchy`.
- Keep all six logo cards, the hierarchy tree, and the explanatory card exactly as they are visually.
- Move the combined section directly above Asset Guidelines.
- Update the page nav to the final label set listed above.

### Clipboard behavior

- Make each logo image in the gallery clickable and keyboard-operable by wrapping the image in a button-like control. Do not change its visible dimensions, gradient background, or hover treatment.
- Add `data-copy-image` with the current image `src` and a human-readable project name.
- On click:
  1. Fetch the SVG and rasterize it to a PNG via `createImageBitmap` and a canvas.
  2. Write an `image/png` `ClipboardItem` to `navigator.clipboard`.
  3. If image writing is unavailable or rejected, fall back to `navigator.clipboard.writeText` with the absolute SVG URL.
  4. If both fail, show a short error message.
- Show temporary, accessible feedback near the clicked logo: `Copied image`, `Copied link`, or `Copy failed`. Feedback must not shift the gallery layout.
- The clipboard API requires a secure context; GitHub Pages is HTTPS. On `file://`, the fallback is expected and acceptable.

## Acceptance criteria

- All nav links resolve to existing ids; no duplicate ids are introduced.
- The Flavor Brand section appears immediately after Project Brand.
- In Practice contains the three requested h3 blocks, and `Typography` is reachable from the top nav.
- The Pantone values match the official Artwork brand table.
- Gradient guidance states the adjacent-hue rule and names at least three avoid-pair examples.
- Logo Gallery / Hierarchy is a single h2 section above Asset Guidelines and looks unchanged.
- Clicking a logo copies a PNG where supported, otherwise copies the SVG URL, and always gives user feedback.
- `git diff --check` passes for both commits.
- Both branches are pushed to `douglasdemaio/opensuse-branding`.
- PR 1 targets `douglasdemaio/opensuse-branding:master`; PR 2 targets `brand/flavor-brand-in-practice`.

## Risks and mitigation

- **Clipboard support varies by browser.** Mitigate with the URL fallback and visible status text.
- **Scroll highlighting may miss `#typography`.** Mitigate by generalizing the active-link logic to consider any id referenced by the nav.
- **Stacked branches can drift.** Mitigate by creating the second branch only after the first commit and limiting PR 2 to gallery/copy/nav-finalization changes.
