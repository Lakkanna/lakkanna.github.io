import Link from 'next/link';
import { ROUTES } from '@/constants';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-4 text-background text-center">
        <h1 className="text-4xl font-black leading-tight tracking-tighter text-content-light dark:text-white sm:text-5xl md:text-6xl">
          Building Intelligent, Resilient, and Design-Driven Web Platforms
        </h1>
        <h2 className="mx-auto max-w-3xl mt-4 text-base font-normal text-content-light/80 dark:text-content-dark/80 md:text-lg">
          Performance-driven Senior Software Engineer with a proven track record
          in designing, developing, and delivering scalable, AI-driven
          applications. Expertise in Full Stack engineering, Front-End
          development, system architecture, and AI-powered solution design.
        </h2>
      </div>
      <Link
        href={ROUTES.projects}
        className="flex h-12 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/50"
      >
        <span>View My Work</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </Link>
    </div>
  );
}
