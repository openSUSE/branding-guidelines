# openSUSE Adaptive Branding

The openSUSE brand identity system — **one chameleon, many colors**.

The mascot stays the same — recognizable, friendly, distinctly ours — but its color shifts to match the personality of each sub-project. The shape is constant; the palette is alive.

🔗 **Live site:** [douglasdemaio.github.io/opensuse-branding](https://douglasdemaio.github.io/opensuse-branding/)

## What's Here

```
├── index.html          # Main branding guide page
├── favicon.svg         # openSUSE button mark used in the universe toolbar
├── css/style.css       # Style system (theme variables, layout, components)
├── js/main.js          # Interactions (toolbar panel, copy-to-clipboard, etc.)
├── images/             # Official project logo SVGs
│   ├── openSUSE.svg
│   ├── Tumbleweed.svg
│   ├── Leap.svg
│   ├── microOS.svg
│   ├── Kalpa.svg
│   └── Slowroll.svg
└── Flyers/             # Print-ready flyers (PDF + SVG) and editable sources
```

The masthead, palette, and light/dark behaviour follow the shared openSUSE
look used by [opensuse.github.io/request](https://opensuse.github.io/request/).

## Color DNA

Each sub-project has its own signature color:

| Project      | Color           | Hex       |
|-------------|-----------------|-----------|
| openSUSE    | Geeko Green     | `#42cd42` |
| Tumbleweed  | Turquoise Teal  | `#20caa3` |
| Leap        | Yarrow Yellow   | `#d4cb1b` |
| MicroOS     | Plum Purple     | `#a498ff` |
| Kalpa       | Jade Teal       | `#25ac95` |
| Slowroll    | Radish Red      | `#ff5b45` |

Additional palette colors: Butterfly Blue (`#00c8ff`).

## Contributing

Contributions are welcome! Whether it's fixing a typo, improving the design, adding new brand assets, or proposing changes to the guidelines — we'd love your help.

### How to Contribute

1. **Fork this repository** — click the Fork button at the top right of this page.

2. **Clone your fork:**
   ```bash
   git clone https://github.com/<your-username>/opensuse-branding.git
   cd opensuse-branding
   ```

3. **Create a branch** for your changes:
   ```bash
   git checkout -b my-improvement
   ```

4. **Make your changes** — edit HTML, CSS, add/update SVGs, improve copy, etc.

5. **Test locally** — open `index.html` in a browser to preview. No build step needed; it's plain HTML/CSS/JS.

6. **Commit and push:**
   ```bash
   git add -A
   git commit -m "Describe what you changed"
   git push origin my-improvement
   ```

7. **Open a Pull Request** — go to your fork on GitHub and click "Compare & pull request". Describe what you changed and why.

### What You Can Work On

- **Wallpapers** — Design and submit wallpapers! See the [openSUSE Wallpapers wiki](https://en.opensuse.org/openSUSE:Wallpapers) for submissions
- **Logo updates** — Add new project logos or refine existing SVGs in `images/`
- **Color palette** — Propose adjustments to the Color DNA
- **Stickers & merch** — Design new sticker layouts (check existing ones at [shop.opensuse.org](https://shop.opensuse.org))
- **Guidelines** — Improve or expand the sticker, wallpaper, and typography specs
- **New sections** — Add brand usage examples, templates, or downloadable assets
- **Accessibility** — Improve contrast, screen reader support, keyboard navigation
- **Responsive design** — Fix mobile layout issues or improve small-screen experience
- **Copy and content** — Fix typos, clarify descriptions, improve wording

### Guidelines for Contributions

- Keep the design consistent with the existing visual language (light/dark palette, shared openSUSE universe header, rounded cards, Inter font)
- Use the Color DNA palette — don't introduce arbitrary colors
- SVG logos should use a `400×400` viewBox for consistency
- Test your changes in at least one modern browser before submitting
- Keep commits focused — one logical change per commit

### Adding a New Project Logo

1. Create an SVG with a `400mm × 400mm` canvas and `viewBox="0 0 400 400"`
2. Use a single fill color from (or harmonious with) the Color DNA palette
3. Place it in `images/ProjectName.svg`
4. Add a card in the Logo Gallery section of `index.html`
5. Add a node in the Project Hierarchy if applicable

## License

This project contains openSUSE brand assets. The openSUSE logos and trademarks are property of SUSE LLC. Usage is governed by the [openSUSE Trademark Guidelines](https://en.opensuse.org/openSUSE:Trademark_guidelines).

The website code (HTML, CSS, JS) is available under the [MIT License](https://opensource.org/licenses/MIT).

## Links

- [openSUSE.org](https://www.opensuse.org)
- [openSUSE Brand Guidelines](https://en.opensuse.org/openSUSE:Artwork_brand)
- [openSUSE Wallpapers](https://en.opensuse.org/openSUSE:Wallpapers) — submit your wallpaper designs
- [openSUSE Shop](https://shop.opensuse.org) — official stickers and merch
- [openSUSE GitHub](https://github.com/openSUSE)
