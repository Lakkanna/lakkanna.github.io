import {
  Activity,
  ArrowUpRight,
  GraduationCap,
  PenTool,
  type LucideIcon,
} from 'lucide-react';
import { PROJECT_LINKS, ROUTES } from '@/constants';

interface ShowcaseItem {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  icon: LucideIcon;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: 'CCA-F Mock Tests',
    description:
      'Mock tests for Claude Certified Architect Foundations certification. Practice with realistic questions covering architecture patterns, system design, and AI integration strategies.',
    technologies: ['Next.js', 'TypeScript', 'AI', 'Certification'],
    link: ROUTES.architectPracticeLab,
    icon: GraduationCap,
  },
  {
    title: 'SVG Creator',
    description:
      'Create and export SVG illustrations directly in the browser. A lightweight tool for generating scalable vector graphics with an intuitive visual interface.',
    technologies: ['React', 'SVG', 'Canvas', 'TypeScript'],
    link: ROUTES.svgMaker,
    icon: PenTool,
  },
  {
    title: 'MyMacros',
    description:
      'AI-powered nutrition tracking with personalized fitness goals and intelligent insights that adapt to your lifestyle. Automatic calorie counting and macro monitoring with adaptive recommendations.',
    technologies: ['Next.js', 'React', 'AI', 'Health'],
    link: PROJECT_LINKS.noobstoday,
    icon: Activity,
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
            const Icon = item.icon;
            const ariaLabel = isExternal
              ? `Open ${item.title} in a new tab`
              : `Open ${item.title}`;
            return (
              <a
                key={item.title}
                href={item.link}
                aria-label={ariaLabel}
                {...(isExternal && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                className="group glassmorphic-card flex flex-col rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-subtext-light dark:text-subtext-dark opacity-60 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </div>
                <h3 className="mb-2 mt-4 text-xl font-bold text-text-light dark:text-text-dark">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-subtext-light dark:text-subtext-dark">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20 dark:bg-primary/20 dark:text-primary/90"
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
