# Portfolio Website (Static)

Fully static, single-page portfolio for showcasing Abu Shalak Ruhan's AI and software work. Everything is rendered in `index.html`, so you can host it on any static hosting platform—no FastAPI or server runtime required.

## Features
- Responsive Tailwind UI with gradients, glassmorphism, and section reveals
- Light/dark theme toggle with persistence via `localStorage`
- Animated stat counters, timeline cards, and smooth scrolling navigation
- Contact shortcuts plus a direct link to the latest resume snapshot
- Vanilla JS + CSS only; deploy by uploading the files or serving them directly

## Tech Stack
- HTML + Tailwind CSS via CDN
- Vanilla JavaScript (`static/app.js`) for theme + animation logic
- Minimal CSS helpers in `static/styles.css`

## Project Structure
```
.
├── index.html            # Standalone page containing all content
├── static/
│   ├── app.js            # Theme toggle, animations, stat counters
│   └── styles.css        # Helper styles for animations
└── README.md
```

## Local Preview
1. Clone the repo:
   ```powershell
   git clone https://github.com/shalakruhan28/Portfolio-Website.git
   cd Portfolio-Website
   ```
2. Open `index.html` directly in your browser **or** run a lightweight static server:
   ```powershell
   python -m http.server 8000
   # or
   npx serve .
   ```
3. Visit http://localhost:8000 to preview.

## Deployment
- Upload `index.html` and the `static/` folder to GitHub Pages, Netlify Drop, Vercel static deploys, Azure Static Web Apps, Amazon S3 + CloudFront, etc.
- Ensure relative paths remain intact (`static/...`).
- For custom domains, point DNS to your host and verify HTTPS.

## Customization
- Update hero text, stats, projects, skills, and experience directly in `index.html`. Each section is grouped together, so it is easy to edit.
- Adjust theme colors or animations in `static/styles.css` and `static/app.js`.
- Swap fonts or Tailwind config in the `<head>` block if you prefer a different look.

## Next Ideas
- Wire the contact section to services like Formspree or Buttondown.
- Auto-populate projects via the GitHub API.
- Export a PDF version of the resume and link it alongside the Markdown copy.
