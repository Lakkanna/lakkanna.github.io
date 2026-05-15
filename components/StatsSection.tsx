import { CalendarDays, Rocket, Sparkles, Users } from 'lucide-react';
import { yearsOfExperience } from '@/constants';

interface Stat {
  icon: typeof CalendarDays;
  value: string;
  label: string;
}

export default function StatsSection() {
  const stats: Stat[] = [
    {
      icon: CalendarDays,
      value: `${yearsOfExperience()}+`,
      label: 'Years shipping production',
    },
    {
      icon: Rocket,
      value: '21k+',
      label: 'VS Code extension installs',
    },
    {
      icon: Users,
      value: '3+',
      label: 'Product teams led',
    },
    {
      icon: Sparkles,
      value: 'AI',
      label: 'Full-stack focus area',
    },
  ];

  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="flex flex-col gap-2 rounded-xl border border-border-light bg-card-light p-6 text-left shadow-lg shadow-black/[0.02] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/[0.04] dark:border-border-dark dark:bg-card-dark dark:shadow-black/20 dark:hover:shadow-black/30"
        >
          <Icon className="h-5 w-5 text-primary" aria-hidden />
          <p className="text-3xl font-extrabold tracking-tight tabular-nums text-content-light dark:text-white">
            {value}
          </p>
          <p className="text-sm font-medium text-content-light/80 dark:text-content-dark/80">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
