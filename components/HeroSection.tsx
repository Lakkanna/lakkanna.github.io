import Link from 'next/link';
import { ArrowRight, Code2, MapPin, Mail, Users } from 'lucide-react';
import { ROUTES, PERSONAL_INFO } from '@/constants';

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center gap-8 isolate">
      <div className="absolute inset-x-0 -top-20 -z-10 h-[60vh] hero-spotlight pointer-events-none" />

      <span className="inline-flex items-center gap-2 rounded-full border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-3 py-1 text-xs font-medium text-content-light dark:text-content-dark">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        Available for senior IC &amp; staff roles
      </span>

      <div className="flex flex-col gap-4 text-background text-center">
        <h1 className="text-4xl font-black leading-tight tracking-tighter text-content-light dark:text-white sm:text-5xl md:text-6xl">
          Engineering{' '}
          <span className="text-primary">intelligent, resilient</span> web
          platforms that scale.
        </h1>
        <p className="mx-auto max-w-3xl mt-4 text-base font-normal text-content-light/80 dark:text-content-dark/80 md:text-lg">
          Performance-driven Senior Software Engineer with a proven track record
          shipping production AI, full-stack systems, and design-led front-end
          at scale.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link
          href={ROUTES.projects}
          className="inline-flex h-12 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          <span>View my work</span>
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-6 text-base font-semibold text-content-light dark:text-content-dark transition-all hover:bg-card-light/80 dark:hover:bg-card-dark/80 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          <Mail className="h-5 w-5" aria-hidden />
          <span>Get in touch</span>
        </a>
      </div>

      <div className="mt-2 flex items-center justify-center gap-x-5 gap-y-2 flex-wrap text-xs text-subtext-light dark:text-subtext-dark">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {PERSONAL_INFO.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Code2 className="h-3.5 w-3.5" aria-hidden />
          React · Next.js · AI
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden />
          Led 3+ teams
        </span>
      </div>
    </div>
  );
}
