import { ROUTES } from '@/constants';

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
    title: 'noobstoday',
    description:
      'Curated learning paths and resources for developers at every level. From fundamentals to advanced topics, bridging the gap between beginner and skilled developer.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Education'],
    link: ROUTES.noobstoday,
    icon: 'rocket_launch',
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
          {showcaseItems.map((item) => (
            <a
              key={item.title}
              href={item.link}
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
          ))}
        </div>
      </div>
    </div>
  );
}
