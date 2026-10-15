# Ankhbayar — UI/UX & Visual Design

Live portfolio: https://ankhbayar-design.rightbirch64.chatgpt.site

A responsive Mongolian/English portfolio with 20 projects across UI/UX, visual identity and print. The warm editorial layout includes three slow artwork columns, project filters, a data-driven portfolio infographic, a selectable motion graphic of the design process and artwork galleries. The 12 original digital project covers use complete original interface screens in CSS phone or browser mockups, with clear full-size views and complete web pages. The profile covers UI/UX, graphic and brand design, motion graphics and web design.

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

## Poster collection and profile

Eleven original A4 posters from the supplied Figma file are self-hosted. Posters 01, 08 and 06 lead the dedicated section; two identical groups move right-to-left in a seamless transform loop. The gallery links each selected poster to its exact Figma frame. Offscreen, hidden-tab, modal and manual motion pauses are supported.

The opening section pairs the designer’s name with three moving artwork columns. A separate about section contains the supplied full-resolution portrait, experience, education and advanced Claude and ChatGPT use. The poster section precedes the project grid; the interactive TG Sport concept section follows selected work. Supporting text uses a clearer 13–16 px scale. The contact section uses four visible email, phone, Instagram and GitHub cards. Mobile project covers use a layered metal rim, glass screen, camera island and hardware details.

Illustrative cover photography: John Karlo Mendoza, https://unsplash.com/photos/idzUojjazCg ; Edward Ji, https://unsplash.com/photos/pZeP-szcWTU . Used under the Unsplash License, https://unsplash.com/license . The accompanying miniature interfaces show the actual concept artwork.

Personal Background records, contact details and the portrait are kept on the live portfolio. This public source links to that profile and contains the project work, identities and brand guide.

The public repository contains the application source and compiled HTML/CSS/JS. Media links resolve to the deployed portfolio; the full source, five interactive concept demos and media are retained by the Site project. The public application opens the demos on that live origin.
