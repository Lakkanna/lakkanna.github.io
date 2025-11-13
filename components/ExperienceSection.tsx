import Link from 'next/link'
import { ROUTES } from '@/constants'

interface ExperienceItem {
  icon: string
  title: string
  company: string
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
  logo: string
  logoAlt: string
}

const experiences: ExperienceItem[] = [
  {
    icon: "work",
    title: "Senior Software Engineer",
    company: "ExpressRCM Private Limited",
    duration: "Nov'20 – Present",
    description: "Providing technical leadership to a six-member engineering team, establishing architectural standards, scalable design frameworks, and development best practices. Designing and directing the development of an AI-powered Just-in-Time Training Platform.",
    achievements: [
      "Accelerated integration processes by 80% through OpenAPI client generation and automated schema alignment.",
      "Mitigated code-level vulnerabilities by 30% via proactive adoption of OSV Scanner and Snyk.",
      "Established continuous testing pipelines via Playwright and GitHub Actions, expanding coverage by 40%.",
      "Formulated and integrated FHIRCast-based WebSocket communication architecture for EPIC's Hyperdrive ecosystem.",
      "Developed retrieval-augmented generation (RAG) pipelines to streamline medical documentation creation.",
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "Node.js", "RAG Pipelines", "WebSocket", "Playwright", "Cloudflare"],
    logo: "/logos/expressrcm.jpeg",
    logoAlt: "ExpressRCM logo",
  },
  {
    icon: "code",
    title: "Senior Software Engineer",
    company: "314e IT Solutions India Pvt. Ltd.",
    duration: "Oct'19 – Oct'20",
    description: "Redesigned platform architecture to achieve a 35% performance uplift through intelligent implementation of lazy loading, dynamic imports, and optimized code-splitting strategies.",
    achievements: [
      "Enhanced system reliability with a modernized testing framework incorporating Vitest, Playwright, and React Testing Library.",
      "Introduced Matomo-based analytics architecture to enable behavioral insights and product usage measurement.",
      "Deployed fully automated CI/CD pipelines via GitHub Actions and Cloudflare, accelerating release cadence.",
      "Streamlined delivery cycles by implementing modular architecture principles, cutting feature rollout time by 30%.",
    ],
    technologies: ["React.js", "TypeScript", "Vitest", "Playwright", "GitHub Actions", "Cloudflare", "Matomo"],
    logo: "/logos/314e.png",
    logoAlt: "314e IT Solutions logo",
  },
  {
    icon: "hotel",
    title: "Software Engineer",
    company: "Hotelsoft Inc.",
    duration: "Jul'18 – Sept'19",
    description: "Modernized legacy applications by refactoring from class-based React components to hooks-based architecture, improving maintainability and rendering performance.",
    achievements: [
      "Designed and implemented candidate tracking interfaces using React, Redux, and Ant Design.",
      "Unified front-end frameworks by consolidating Material-UI and Ant Design ecosystems.",
      "Developed and deployed a Chrome extension to extract and synchronize candidate data from browser workflows.",
    ],
    technologies: ["React", "Redux", "Ant Design", "Material-UI", "Chrome Extension", "JavaScript"],
    logo: "/logos/hotelsoft.png",
    logoAlt: "Hotelsoft logo",
  },
]

export default function ExperienceSection() {
  return (
    <div className="flex flex-1 justify-center px-4 py-10 sm:px-10 md:px-20 lg:px-40">
      <div className="flex max-w-[960px] flex-1 flex-col gap-12">
        <div className="flex flex-wrap justify-between gap-3 text-center">
          <h1 className="w-full text-4xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark md:text-4xl text-background mx-auto">Career Journey</h1>
        </div>
        <div className="relative pl-10">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20 dark:bg-primary/30"></div>
          {experiences.map((exp, index) => (
            <div key={index} className={`relative ${index < experiences.length - 1 ? 'mb-12' : ''}`}>
              <div className="absolute -left-7 top-1 flex size-6 items-center justify-center rounded-full bg-primary ring-8 ring-background-light dark:ring-background-dark">
                <span className="material-symbols-outlined text-sm text-white">{exp.icon}</span>
              </div>
              <div className="glassmorphic-card rounded-xl p-6 shadow-lg">
                <div className="mb-4 flex items-start gap-4">
                  <img 
                    alt={exp.logoAlt} 
                    className="h-12 w-12 rounded-lg" 
                    src={exp.logo}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{exp.title}</h3>
                    <p className="text-subtext-light dark:text-subtext-dark">{exp.company} ({exp.duration})</p>
                  </div>
                </div>
                <p className="mb-4 text-subtext-light dark:text-subtext-dark">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="mb-4 ml-5 list-disc space-y-1 text-subtext-light dark:text-subtext-dark">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

