import Link from 'next/link';
import SocialIcons from './SocialIcons';
import {
  PERSONAL_INFO,
  ROUTES,
  SOCIAL_LINKS,
  EXTERNAL_LINKS,
} from '@/constants';

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const exploreLinks: FooterLink[] = [
  { label: 'Work', href: ROUTES.projects },
  { label: 'Writing', href: SOCIAL_LINKS.medium, external: true },
  { label: 'CCA-F Mock Tests', href: ROUTES.architectPracticeLab },
  { label: 'Résumé (PDF)', href: EXTERNAL_LINKS.resumeLink, external: true },
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold tracking-tight">
              {PERSONAL_INFO.displayName}
            </p>
            <p className="mt-3 text-sm text-subtext-light dark:text-subtext-dark max-w-xs">
              Senior software engineer based in {PERSONAL_INFO.location}.
              Building thoughtful, high-performance products with AI.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtext-light dark:text-subtext-dark">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {exploreLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:text-primary transition-colors ${FOCUS_RING}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`hover:text-primary transition-colors ${FOCUS_RING}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtext-light dark:text-subtext-dark">
              Connect
            </p>
            <div className="mt-3">
              <SocialIcons size="md" layout="horizontal" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-5 border-t border-border-light dark:border-border-dark flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-subtext-light dark:text-subtext-dark">
          <p>
            © {PERSONAL_INFO.copyrightYear} {PERSONAL_INFO.fullName}
          </p>
          <p>Built with Next.js · deployed on GitHub Pages</p>
        </div>
      </div>
    </footer>
  );
}
