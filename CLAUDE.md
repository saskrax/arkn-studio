# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is the marketing website for **Arkn Studio**, a web-design studio for Mexican SMBs (PyMEs) based in Los Mochis, Sinaloa. There is no framework, build step, or package manager — every page is hand-written static HTML/CSS/JS.

- `index.html` — the main Arkn Studio site. A single ~2100-line file with all CSS in a `<style>` block in `<head>` and all JS in a `<script>` block before `</body>`. No external stylesheet or script files.
- `demo-barberia/`, `demo-clinica/`, `demo-gym/` — three standalone, self-contained demo sites (barbershop, dental clinic, gym), each with its own `index.html` + `styles.css` + `script.js`. These are portfolio pieces showcasing the studio's work in different verticals, built independently of the main site and of each other (different CSS variable names, different font pairings, different JS patterns).

None of the `demo-*` folders are linked from `index.html`. The "Portafolio" section in `index.html` (search `PORTAFOLIO (5 DEMOS REALES VERCEL)`) instead links out to separately deployed Vercel demo sites (e.g. `https://yucatan-dental-demo.vercel.app`) that live outside this repo. Don't assume the local `demo-*` folders are wired into the main site's navigation or CTAs.

## Development workflow

There is no build, bundle, lint, or test tooling in this repo (no `package.json`). To preview changes, just open the HTML file in a browser or serve the directory statically, e.g.:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html` or `http://localhost:8000/demo-gym/index.html`, etc. Verify changes visually in-browser since there is no automated test suite.

Each demo folder is independent — changes to one demo's CSS/JS have no effect on the others or on the main site.

## Conventions

- **Language**: all user-facing copy is in Mexican Spanish (`lang="es"`). Keep new copy consistent with that tone/locale.
- **WhatsApp-first CTAs**: every primary call-to-action across the site and demos is a `https://wa.me/<number>?text=<url-encoded message>` link rather than a contact form that posts anywhere. Where an actual `<form>` exists (e.g. `demo-clinica/script.js`'s `citaForm`), its submit handler builds a message string and opens it via `wa.me` — there is no backend; nothing is actually submitted server-side.
- **Two different phone numbers are used on purpose**: the real studio number `526688853458` appears throughout `index.html` (WhatsApp CTAs, `mailto:` links, JSON-LD). The three `demo-*` folders all use a shared **placeholder** number `526681234567` (see the `// Cambiar por número real` comment in `demo-clinica/script.js`) — don't confuse the two or "fix" the demo numbers to match the studio's.
- **Styling is CSS custom properties per page**: each of the four pages defines its own `:root` palette/typography variables independently (e.g. `index.html` uses `--bg`, `--accent`, `--cyan`; demos define their own). There's no shared design-token file, so changes to one page's variables don't propagate.
- **Scroll animations differ by page**: `index.html` uses GSAP + ScrollTrigger (loaded via CDN with `defer`) driving `.fu` (fade-up) classes. The `demo-*` sites instead use a hand-rolled `IntersectionObserver` pattern toggling a `.reveal`/`.visible` class — no GSAP dependency there. Match the existing pattern for the file you're editing rather than introducing GSAP into a demo or the observer pattern into the main site.
- **Fonts**: `index.html` uses Space Grotesk (headings) + Inter (body) from Google Fonts. Demo sites use their own pairings (e.g. `demo-barberia` uses Bebas Neue + DM Sans) loaded via `<link>` tags in each page's own `<head>`.
- **SEO/meta boilerplate**: `index.html` carries Open Graph, Twitter Card, and JSON-LD (`ProfessionalService`) metadata, plus a Meta Pixel snippet near the end of `<body>`. Preserve/update this metadata together when changing studio contact info, pricing, or the page title/description — it's duplicated across several tags.
- **No image assets are stored in-repo**: all imagery is referenced via external URLs (Unsplash) or inline SVG data URIs (favicon, noise-texture overlays). Follow the same approach rather than adding binary image files.
