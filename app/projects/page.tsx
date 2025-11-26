import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';
import Background from '@/components/Background';
import Link from 'next/link';
import { PROJECT_LINKS } from '@/constants';

interface Project {
  title: string;
  description: string;
  stats?: string;
  technologies: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: 'MyMacros',
    description:
      'A comprehensive health & fitness companion platform that combines cutting-edge AI with proven health science. Features AI-powered nutrition tracking, personalized fitness goals, intelligent meal suggestions, and detailed macro tracking. Built with a focus on privacy, performance, and user experience.',
    stats: 'Personal Project',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'EC2',
      'AI Agent',
      'Health Tracking',
      'Real-time Sync',
    ],
    link: PROJECT_LINKS.myMacros,
  },
  {
    title: 'CSS Converter',
    description:
      'A lightweight VS Code extension that seamlessly converts CSS property names between kebab-case and camelCase, enhancing developer productivity and streamlining styling workflows in React and JavaScript projects.',
    stats: '21k+ installs',
    technologies: ['VS Code Extension', 'TypeScript', 'VS Code API'],
    link: PROJECT_LINKS.cssConverter,
  },
  {
    title: 'The Travis Client',
    description:
      'A VS Code extension using TypeScript and the VS Code API that integrates Travis CI build monitoring directly within the editor, allowing developers to track build statuses and pipeline progress in real time.',
    technologies: [
      'VS Code Extension',
      'TypeScript',
      'Travis CI',
      'VS Code API',
    ],
    link: PROJECT_LINKS.travisClient,
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden">
      <Background />
      <div className="relative z-10 flex h-full w-full max-w-5xl grow flex-col px-4 sm:px-6 lg:px-8">
        <TopNavBar />
        <main className="flex flex-1 flex-col py-10 mt-24">
          <div className="flex flex-col py-8 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glassmorphic-card rounded-xl p-6 shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                        {project.title}
                      </h2>
                      {project.stats && (
                        <p className="text-sm text-primary font-medium mb-2">
                          {project.stats}
                        </p>
                      )}
                      <p className="text-base text-subtext-light dark:text-subtext-dark mb-4">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <span>
                        {project.link.includes('marketplace.visualstudio.com')
                          ? 'View on VS Code Marketplace'
                          : 'Visit Website'}
                      </span>
                      <span className="material-symbols-outlined text-base">
                        open_in_new
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </div>
  );
}
