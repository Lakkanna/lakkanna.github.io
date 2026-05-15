import { PROJECT_LINKS, ROUTES } from '@/constants';

interface ShowcaseItem {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  icon: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: 'CCA-F Mock Tests',
    description:
      'Mock tests for Claude Certified Architect Foundations certification. Practice with realistic questions covering architecture patterns, system design, and AI integration strategies.',
    technologies: ['Next.js', 'TypeScript', 'AI', 'Certification'],
    link: ROUTES.architectPracticeLab,
    icon: 'school',
  },
  {
    title: 'SVG Creator',
    description:
      'Create and export SVG illustrations directly in the browser. A lightweight tool for generating scalable vector graphics with an intuitive visual interface.',
    technologies: ['React', 'SVG', 'Canvas', 'TypeScript'],
    link: ROUTES.svgMaker,
    icon: 'draw',
  },
  {
    title: 'MyMacros',
    description:
      'AI-powered nutrition tracking with personalized fitness goals and intelligent insights that adapt to your lifestyle. Automatic calorie counting and macro monitoring with adaptive recommendations.',
    technologies: ['Next.js', 'React', 'AI', 'Health'],
    link: PROJECT_LINKS.noobstoday,
    icon: 'monitor_heart',
  },
];

export default function ShowcaseSection() {
  return (
    <div className="flex flex-1 justify-center px-4 py-10 sm:px-10 md:px-20 lg:px-40">
      <div className="flex max-w-[960px] flex-1 flex-col gap-10">
        <h2 className="w-full text-center text-4xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark text-background mx-auto">
          What I&apos;ve Built
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {showcaseItems.map((item) => {
            const isExternal = /^https?:\/\//.test(item.link);
            return (
              <a
                key={item.title}
                href={item.link}
                {...(isExternal && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                className="glassmorphic-card flex flex-col rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="material-symbols-outlined mb-4 text-3xl text-primary">
                  {item.icon}
                </span>
                <h3 className="mb-2 text-xl font-bold text-text-light dark:text-text-dark">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-subtext-light dark:text-subtext-dark">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
