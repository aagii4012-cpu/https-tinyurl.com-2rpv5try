# Ankhbayar — UI/UX portfolio

A responsive portfolio for Цогбаяр Анхбаяр, based on his actual Figma projects and professional CV. A warm editorial layout, three animated artwork columns, 11 project overviews, Web/Mobile filters, Mongolian/English text and downloadable CV.

Live website: https://ankhbayar-design.rightbirch64.chatgpt.site

The website uses plain HTML, CSS and JavaScript. There are no runtime packages or build dependencies. All project images and fonts are hosted with the website.

## Content

- `projects.json` contains project titles, descriptions, categories and original Figma links.
- `src/index.html`, `src/styles.css` and `src/app.js` are the editable source.
- `dist/` is the complete website ready for static hosting.
- `dist/assets/Ankhbayar-CV.pdf` contains professional information for public sharing.

After editing content or source, regenerate the HTML:

```sh
python3 build.py
```

Publish the contents of `dist/` on GitHub Pages, Cloudflare Pages or another static host. For GitHub Pages, the included workflow uses the GitHub Pages environment; select **GitHub Actions** as the Pages source in repository Settings → Pages.

Project images come from the owner's Figma portfolio. Font attribution is included in `dist/assets/LICENSE-fonts.txt`.
