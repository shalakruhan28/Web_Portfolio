from datetime import date
from pathlib import Path
from typing import List, Dict

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI(title="Portfolio", version="0.1.0", docs_url=None, redoc_url=None)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


PROFILE: Dict[str, str] = {
	"name": "ABU SHALAK RUHAN",
	"tagline": "SOFTWARE ENGINEER • DATA SCIENCE MAJOR • AI ENTHUSIAST",
	"summary": (
		"B.Sc. Software Engineering graduate majoring in Data Science with a focus on "
		"deploying lightweight AI systems. Passionate about building scalable projects "
		"and expanding expertise in Generative AI, ML, and Data Science with a focus on practical applications and real-world problem solving."
	),
	"location": "Dhaka, Bangladesh",
	"email": "shalakruhan1996@gmail.com",
	"linkedin": "https://www.linkedin.com/in/abu-shalak-ruhan/",
	"github": "https://github.com/shalakruhan28",
	"resume_url": "https://drive.google.com/file/d/1gYwY7fKo6cCWoiBmHFEWGS2JZaSt1qpE/view",
	"availability": "Open to Software and AI Engineer roles (onsite/remote)",
}

SKILLS: Dict[str, List[str]] = {
	"AI & Data": [
		"Python",
		"Transformers",
		"scikit-learn",
		"spaCy",
		"pandas",
		"NumPy",
		"TensorFlow",
	],
	"Software & Web": ["FastAPI", "Python", "SQLModel", "MySQL", "GitHub", "HTML", "CSS", "JavaScript"],
	"DevOps & Tools": ["GitHub Actions", "Slack" "GCP", "Weights & Biases", "Streamlit"],
}

PROJECTS: List[Dict[str, str]] = [
	{
		"title": "Bangla Sentiment Analysis using NLP",
		"summary": (
			"Custom Bangla text preprocessing + Leveling Bangla sentiment to Positive, Negative or Neutral. "
		),
		"impact": "Learned how to preprocess Bangla text data and build NLP model for sentiment analysis.",
		"tech": "Using python, sing python, XLM-RoBERTa as Model , AutoTokenizer as Tokenizer , Adam as Optimizer ",
		"repo": "https://github.com/shalakruhan28/Bangla_sentiment_analysis_using_NLP",
		"demo": None,
	},
 
	
	{
		"title": "LEADS_TRACKER_PROJECT",
		"summary": (
			"Intermediate HTML & CSS project"
		),
		"impact": "Getting important tabs easily from the chrome extension.",
		"tech": "Using HTML divs and CSS media queries for responsiveness",
		"repo": "https://github.com/shalakruhan28/Leads-Tracker-JS-Project",
		"demo": None,
	},
	{
		"title": "Portfolio ",
		"summary": (
			"My very own portfolio website to showcase my skills, projects, experience, and education. "
			"sections and resumes for junior engineers."
		),
		"impact": "A digital blueprint of my professional journey and aspirations.",
		"tech": "FastAPI, Jinja2, OpenAI API, TailwindCSS",
		"repo": "https://github.com/shalakruhan28/Portfolio-Website",
		"demo": None,
	},
]
EXPERIENCE: List[Dict[str, str]] = [
	
	{
		"role": "Teaching Assistant",
		"company": "University Programming Lab",
		"timeline": "Jan 2023 – Dec 2023",
		"details": "Mentored 40+ students on algorithms, Python, and data storytelling with pandas + seaborn.",
	},
]


EDUCATION: Dict[str, str] = {
	"degree": "B.Sc. in Software Engineering (Data Science Major)",
	"institution": "Daffodil International University, Dhaka, Bangladesh",
	"timeline": "2022 – 2025",
    "highlights": "Relevant Coursework: Machine Learning, Capstone Project, Data Science, Database Systems, Software Development.",
}

CONTACT: Dict[str, str] = {
	"email": PROFILE["email"],
	"linkedin": PROFILE["linkedin"],
	"github": PROFILE["github"],
}

STATS: Dict[str, str] = {
	"years": str(max(1, date.today().year - 2021)),
	"projects": str(len(PROJECTS)),
	"hackathons": "05",
}




def build_resume_markdown() -> str:
	"""Create a lightweight Markdown resume for download."""
	lines: List[str] = [
		f"# {PROFILE['name']}",
		PROFILE["tagline"],
		f"Email: {PROFILE['email']} | LinkedIn: {PROFILE['linkedin']} | GitHub: {PROFILE['github']}",
		"",
		"## Summary",
		PROFILE["summary"],
		"",
		"## Skills",
	]
	for bucket, values in SKILLS.items():
		lines.append(f"- **{bucket}:** {', '.join(values)}")
	lines.extend(["", "## Projects"])
	for project in PROJECTS:
		lines.append(f"### {project['title']}")
		lines.append(project["summary"])
		lines.append(f"Impact: {project['impact']}")
		lines.append(f"Stack: {project['tech']}")
		lines.append(f"Repo: {project['repo']}")
		lines.append("")
	lines.extend(["## Experience"])
	for job in EXPERIENCE:
		lines.append(f"### {job['role']} • {job['company']} ({job['timeline']})")
		lines.append(job["details"])
		lines.append("")
	lines.extend(
		[
			"## Education",
			f"{EDUCATION['degree']} — {EDUCATION['institution']} ({EDUCATION['timeline']})",
			EDUCATION["highlights"],
			"",
			"_Last updated: {:%b %d, %Y}_".format(date.today()),
		]
	)
	return "\n".join(lines)


@app.get("/", response_class=HTMLResponse)
async def portfolio(request: Request) -> HTMLResponse:
	context = {
		"request": request,
		"profile": PROFILE,
		"skills": SKILLS,
		"projects": PROJECTS,
		"experience": EXPERIENCE,
		"education": EDUCATION,
		"contact": CONTACT,
		"stats": STATS,
		
	}
	return templates.TemplateResponse("index.html", context)



@app.get("/resume/download")
async def download_resume() -> Response:
	resume_md = build_resume_markdown()
	filename = f"{PROFILE['name'].lower().replace(' ', '_')}_resume.md"
	headers = {"Content-Disposition": f"attachment; filename={filename}"}
	return Response(content=resume_md, media_type="text/markdown", headers=headers)


if __name__ == "__main__":
	import uvicorn

	uvicorn.run(app, host="0.0.0.0", port=8000)
