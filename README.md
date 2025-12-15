# Portfolio Website

FastAPI-driven portfolio for showcasing Abu Shalak Ruhan's AI and software work. It serves a Tailwind-powered single-page experience with live stats, project highlights, education timeline, and a downloadable Markdown resume that regenerates from Python data structures.

## Features
- Responsive, animated UI with Tailwind CSS and custom gradients
- Light/dark theme toggle with persistence via `localStorage`
- Dynamic stats counters and experience timeline cards
- Markdown resume generator available at `/resume/download`
- Structured project, skills, experience, and education sections driven from `main.py`

## Tech Stack
- FastAPI + Uvicorn
- Jinja2 templates
- Tailwind CSS via CDN
- Vanilla JavaScript for animations and theming

## Project Structure
```
.
├── main.py               # FastAPI app, data definitions, resume builder
├── templates/
│   ├── base.html         # Global layout, header, footer, scripts
│   └── index.html        # Portfolio content sections
├── static/
│   ├── app.js            # Theme toggle, animations, stat counters
│   └── styles.css        # Helper styles for animations
└── README.md
```

## Local Setup
1. Clone the repo:
   ```powershell
   git clone https://github.com/shalakruhan28/Portfolio-Website.git
   cd Portfolio-Website
   ```
2. Create a virtual environment (optional but recommended):
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```powershell
   pip install fastapi uvicorn jinja2 python-multipart
   ```
4. Run the app:
   ```powershell
   uvicorn main:app --reload
   ```
5. Open the site at http://127.0.0.1:8000.

## Deployment Notes
- The app is self-contained and can be deployed to any ASGI-compatible platform (Railway, Render, Azure App Service, etc.).
- Ensure static files (`static/`) and templates (`templates/`) are copied alongside `main.py`.
- Adjust `host` and `port` in the `if __name__ == "__main__"` block for your target environment.

## Future Enhancements
- Hook the contact section to a real backend or email service
- Add more project cards sourced from GitHub automatically
- Provide a PDF resume generator in addition to Markdown
