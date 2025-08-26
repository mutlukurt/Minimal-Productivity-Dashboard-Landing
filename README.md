# Lumen — Minimal Productivity Dashboard (Landing Page)

Professional, minimal landing page template for a fictional productivity product called "Lumen". The project is intentionally lightweight and framework-free, focusing on accessible markup, a clear design system, and performant front-end patterns.

Key highlights
- Minimal, solid-color design system with a single accent color
- Accessible, semantic HTML5 structure and keyboard-friendly interactions
- Responsive grid and flex layouts (desktop, tablet, mobile)
- Lightweight vanilla JavaScript for small interactive behaviors (no external dependencies)

Repository contents
- `index.html` — fully semantic page structure with well-defined sections and ARIA hooks
- `styles.css` — design tokens, responsive layout rules, utilities and components
- `app.js` — small interaction layer (mobile nav toggle, reveal-on-scroll, FAQ accordion, pricing toggle, form validation, back-to-top)
- `assets/` — small SVG assets (device mockups, avatars, OG image)
- `LICENSE` — MIT license (Mutlu Kurt)

Design system (summary)
- Colors: white background, soft black primary text, solid blue accent (#2563EB), light card surfaces (#F8FAFC)
- Typography: system-ui stack (Inter, SF Pro, Segoe UI, Roboto, sans-serif)
- Spacing scale: 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 (rem)
- Corners: 12px for cards, pills use full radius
- Motion: subtle transitions; respects `prefers-reduced-motion`

Quick start — preview locally
1. Clone the repository (or pull if you already have it):

```bash
git clone https://github.com/mutlukurt/Minimal-Productivity-Dashboard-Landing.git
cd Minimal-Productivity-Dashboard-Landing
```

2. Start a local static server (Python built-in):

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in a browser
```

Developer notes
- No build step required — the project is intentionally static. Edit the HTML/CSS/JS directly.
- Keep assets under `/assets` and reference them with root-relative paths (used for simple GitHub Pages publishing).
- Accessibility: ensure changes preserve ARIA attributes and keyboard focus states. Use `prefers-reduced-motion` for any additional animations.

Form and privacy
- The contact form in this template uses a local, simulated submission for demonstration. Replace the client-side handler in `app.js` with your server or serverless endpoint to accept real messages.

Deployment suggestions
- GitHub Pages: push the repository to GitHub and enable Pages in repository settings (serve from `main` branch root). The static nature of this project makes it an ideal candidate for Pages.
- Static hosts: Netlify, Vercel, or any static hosting provider. If you require serverless form handling, Netlify Functions or Vercel Serverless Functions are easy options.

Contributing
- This repository is intended as a single-file landing template. If you'd like to improve it:
	- Open a pull request with a short description of changes
	- Keep changes minimal and focused (styling, accessibility, or performance improvements preferred)

License
This project is released under the MIT License — see `LICENSE` for full text.

Author
Mutlu Kurt — © 2025

Contact & support
- For questions related to this template, use the contact form on the page or open an issue on GitHub.
