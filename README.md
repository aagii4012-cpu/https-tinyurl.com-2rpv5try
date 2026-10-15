# Ankhbayar — UI/UX & Visual Design

Live portfolio: https://ankhbayar-design.rightbirch64.chatgpt.site

A responsive Mongolian/English portfolio with 19 projects across UI/UX, visual identity and print. The warm editorial layout includes three slow artwork columns, project filters, a data-driven portfolio infographic, a selectable motion graphic of the design process and artwork galleries. The 12 original digital project covers use complete original interface screens in CSS phone or browser mockups, with clear full-size views and complete web pages. The profile covers UI/UX, graphic and brand design, motion graphics and web design.

## Featured work

- TG Sport: an independent redesign featuring the supplied interactive 3D clothing engine, with inline colour, name and number controls and a full studio.
- TITEM, barber.mn and Tavan Khoshuu: personal redesign explorations. Namu Coffee: an original, speculative website concept. The five demos are clearly labelled and run locally without real transactions.
- Kamila Garden: three logo directions and a 17-page restaurant menu, shown with real cover and interior previews.
- PROPLUS: logo usage and a visual identity system with a 26-page brand guide.
- Procreditor: the original SVG logo alongside the website design.

The header stays visible while scrolling. Project galleries expose their Figma link in a sticky toolbar; PetCare includes its inline promo video. CV download actions have been removed. Kamila previews show food and logo artwork.

## Edit and build

`projects.json` holds project content, categories, galleries and links. Edit `src/index.html`, `src/styles.css` and `src/app.js`, then run:

```sh
python3 build.py
```

Deploy `dist/` as a static website. There are no build dependencies or runtime packages. Artwork, brand documents and promo video use the live portfolio as their media origin. Fonts are included in this repository. Font attribution is in `dist/assets/LICENSE-fonts.txt`.

Motion uses CSS transforms, native scroll, requestAnimationFrame and IntersectionObserver. Offscreen and background activity pauses. A motion toggle and reduced-motion support are included; the process steps can also be selected manually.

The included GitHub Pages workflow publishes when Pages is enabled for the repository. The live link above is the current hosted portfolio.

## Concept demonstrations

The supplied concepts are retained under `demos/`; the build copies them to `dist/demos/`. Their original catalogue pictures and Three.js dependencies are cached locally. New concept covers use the supplied artwork, product photography and original livestock geometry. The TG Sport preview loads near the viewport; background/offscreen 3D activity pauses and small screens use its lighter renderer.

Validation: Python build, JavaScript syntax, local resource paths, data counts, ARIA references and retained behaviour checks. Browser QA was unavailable in this environment.

Personal Background records, contact details and the portrait are kept on the live portfolio. This public source links to that profile and contains the project work, identities and brand guide.

The public repository contains the application source and compiled HTML/CSS/JS. Media links resolve to the deployed portfolio; the full source, five interactive concept demos and media are retained by the Site project. The public application opens the demos on that live origin.
