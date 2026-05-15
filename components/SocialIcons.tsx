import { Mail } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { SOCIAL_LINKS, PERSONAL_INFO } from '@/constants';
import { GithubIcon, LinkedinIcon, MediumIcon } from './BrandIcons';

interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

interface SocialLink {
  url: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const socialLinks: Record<string, SocialLink> = {
  linkedin: {
    url: SOCIAL_LINKS.linkedin,
    label: 'LinkedIn profile',
    icon: LinkedinIcon,
  },
  github: {
    url: SOCIAL_LINKS.github,
    label: 'GitHub profile',
    icon: GithubIcon,
  },
  medium: {
    url: SOCIAL_LINKS.medium,
    label: 'Medium profile',
    icon: MediumIcon,
  },
  email: {
    url: `mailto:${PERSONAL_INFO.email}`,
    label: 'Email',
    icon: Mail,
  },
};

const sizeMap = {
  sm: 'h-5 w-5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2';

export default function SocialIcons({
  size = 'md',
  showLabels = false,
  layout = 'horizontal',
  className = '',
}: SocialIconsProps) {
  const iconSize = sizeMap[size];
  const containerClass =
    layout === 'horizontal' ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      {Object.entries(socialLinks).map(([key, social]) => {
        const Icon = social.icon;
        const isMail = key === 'email';
        return (
          <a
            key={key}
            aria-label={social.label}
            href={social.url}
            {...(!isMail && { target: '_blank', rel: 'noopener noreferrer' })}
            className={`inline-flex h-11 ${
              showLabels ? 'px-3' : 'w-11 justify-center'
            } items-center gap-2 rounded-md border border-border-light dark:border-border-dark text-subtext-light dark:text-subtext-dark hover:text-primary hover:border-primary/40 transition-colors ${FOCUS_RING}`}
          >
            <Icon className={iconSize} aria-hidden />
            {showLabels && (
              <span className="capitalize text-sm font-medium">{key}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
