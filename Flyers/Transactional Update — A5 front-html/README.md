# Transactional Update — A5 front — design reference

This is a design mockup created in a visual design tool, exported as a
standalone page. Treat it as a REFERENCE MOCKUP, not production code:
the markup and inline styles carry the design's precise values — colors,
font sizes, spacing, radii, shadows, layout — which an implementation
should replicate faithfully in its own components and styling system
rather than copy wholesale.

## Contents

- `TransactionalUpdate.dc.html` — the artboard (a Design Component: an
  `<x-dc>` template + a small logic class). The values to replicate live in
  its inline `style="…"` attributes and the `<helmet><style>` block.
- `assets/` — files uploaded to the design (images, fonts, media)
- `support.js`, `vendor/react*.js` — the runtime that renders the
  component in a browser; not part of the design.

## Uploaded files

Images, fonts and media uploaded to the design are written once each under
`assets/` — 4 in this export — and the exported files refer to them there.

## Printing

The print-ready PDF is `../pdf/transactional-update-a5-front.pdf` — 148 ×
210 mm (A5). Print at 100% / actual size, not "fit to page".

Regenerate every flyer PDF from the `flyers` folder with:

    ./make-pdfs.sh

## Editing

The editable SVG is `../svg/transactional-update-a5-front.svg` — same trim
size. Text is live `<text>` (not outlines); the SUSE font is embedded in
the file. Code samples use Source Code Pro, and `openSUSE` keeps its brand
casing.

Regenerate every flyer SVG from the `flyers` folder with:

    ./make-svgs.sh

## Viewing

Serve the folder (e.g. `python3 -m http.server`) and open
`TransactionalUpdate.dc.html`; some browsers block the scripts over file://.
