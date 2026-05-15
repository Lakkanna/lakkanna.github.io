'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { ROUTES, SOCIAL_LINKS, PERSONAL_INFO } from '@/constants';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  match?: string;
}

const navLinks: NavLink[] = [
  { label: 'Work', href: ROUTES.projects, match: ROUTES.projects },
  { label: 'Blogs', href: SOCIAL_LINKS.medium, external: true },
  { label: 'CCA-F Mock Tests', href: ROUTES.architectPracticeLab },
  { label: 'SVG Creator', href: ROUTES.svgMaker },
];

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2';

export default function TopNavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === ROUTES.home) return pathname === ROUTES.home;
    return pathname.startsWith(path);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const linkClass = (link: NavLink) =>
    `text-sm whitespace-nowrap transition-colors rounded-md px-1 py-1 ${FOCUS_RING} ${
      isActive(link.match)
        ? 'text-primary font-bold'
        : 'font-medium hover:text-primary'
    }`;

  const mobileLinkClass = (link: NavLink) =>
    `block rounded-md px-3 py-3 text-sm transition-colors ${FOCUS_RING} ${
      isActive(link.match)
        ? 'text-primary font-bold bg-primary/10'
        : 'font-medium hover:bg-card-light dark:hover:bg-card-dark'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="navbar-glass flex w-full items-center gap-4">
          <Link
            href={ROUTES.home}
            className={`flex-shrink-0 min-w-0 rounded-md ${FOCUS_RING}`}
          >
            <div className="flex items-center gap-3">
              <Logo
                className="text-content-light dark:text-content-dark"
                size={24}
              />
              <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                {PERSONAL_INFO.displayName}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex flex-1 items-center justify-end gap-6 lg:gap-8 min-w-0"
            aria-label="Primary"
          >
            <div className="flex items-center gap-5 lg:gap-7">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass(link)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={linkClass(link)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:text-primary dark:hover:text-primary transition-colors ${FOCUS_RING}`}
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:text-primary dark:hover:text-primary transition-colors ${FOCUS_RING}`}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:text-primary dark:hover:text-primary transition-colors ${FOCUS_RING}`}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" aria-hidden />
              </a>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1 ml-auto flex-shrink-0">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:bg-card-light dark:hover:bg-card-dark transition-colors ${FOCUS_RING}`}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        {menuOpen && (
          <div
            id="mobile-nav"
            className="navbar-glass md:hidden mt-2 p-2 space-y-1"
          >
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mobileLinkClass(link)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={mobileLinkClass(link)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="border-t border-border-light dark:border-border-dark my-1" />
            <div className="flex items-center gap-1 p-1">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={`flex-1 inline-flex h-11 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:text-primary transition-colors ${FOCUS_RING}`}
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={`flex-1 inline-flex h-11 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:text-primary transition-colors ${FOCUS_RING}`}
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email"
                className={`flex-1 inline-flex h-11 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:text-primary transition-colors ${FOCUS_RING}`}
              >
                <Mail className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
