"use client";
import React from "react";
import jobRadarImage from "@/public/assets/jobradar.png";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ProjectDisplay() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  const router = useRouter();

  const navigate = () => {
    router.push("/");
  };

  return (
    <div className="w-full  relative z-50 ">
      <Button
        onClick={() => navigate()}
        className="mx-3 bg-white dark:bg-white hover:bg-white/70"
      >
        <ArrowLeft className="text-zinc-700 dark:text-dark-1 " />
      </Button>
      {/* <h2 className="pl-4 mx-auto text-xl md:text-5xl font-bold dark:text-neutral-800 text-neutral-200 font-sans">
        Take a look at my Work
      </h2> */}
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "AI & Job Search Automation",
    title: "Job Radar",
    src: jobRadarImage,
    github: "https://github.com/AhmerFarooq04/alberta-job-radar",
    tags: ["Python", "Gemini API", "SQLite", "FastAPI", "React", "TypeScript"],
    description:
      "Job Radar finds jobs on company career pages, filters them, and scores new opportunities against your resumes with Gemini. It stores the results in SQLite and brings them together in a Kanban dashboard, with Telegram notifications linking you directly to applications.",
    details: [
      {
        title: "Discover & filter",
        text: "A Python pipeline collects listings from company career pages and applicant tracking systems, including Workday, Greenhouse, Lever, and Ashby. Requests fetches listings and Beautiful Soup parses HTML, while YAML and PyYAML manage employer lists, ATS settings, and filtering defaults.",
      },
      {
        title: "Match against your resumes",
        text: "Gemini evaluates new opportunities against resumes for AI/ML, automation and IT, data analytics, and software roles. The Google GenAI SDK returns a fit score, category, and explanation; Pydantic validates the structured response. API keys and local settings are loaded with python-dotenv.",
      },
      {
        title: "A dashboard for decisions",
        text: "A React and TypeScript Kanban interface displays the opportunities, with a dark CSS theme and score colours to help compare matches. Vite handles development and production builds, while FastAPI and Uvicorn serve the dashboard data.",
      },
      {
        title: "Remember & notify",
        text: "SQLite, accessed through Python's sqlite3 module, remembers jobs, scores, baselines, and notification deliveries. The Telegram Bot API sends scored opportunities with application links, bringing new matches into a channel you can check throughout the day.",
      },
      {
        title: "Modular & tested",
        text: "The codebase separates configuration, filtering, matching, storage, the API, notifications, and ATS-specific scrapers. pytest, FastAPI TestClient, and HTTPX support unit and API tests across the pipeline, with Git and GitHub used for version control and updates.",
      },
      {
        title: "Deployment & next steps",
        text: "Deployment files are supplied for Docker, Docker Compose, and Nginx. A systemd timer and Bash scripts support daily execution, with flock preventing overlapping runs. The planned host is a Linux VM on Proxmox; server deployment has not yet been verified. Discord, WhatsApp, and generic scraping are unused, and report.py has no established active role.",
      },
    ],
  },
];
