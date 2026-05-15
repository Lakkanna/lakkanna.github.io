interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 24 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} glow`}
      width={size}
      height={size}
      aria-hidden
    >
      <rect
        width="48"
        height="48"
        rx="6"
        className="fill-content-light dark:fill-white"
      />
      <line
        x1="14"
        y1="8"
        x2="14"
        y2="34"
        strokeWidth="10"
        className="stroke-white dark:stroke-content-light"
      />
      <line
        x1="19"
        y1="37"
        x2="40"
        y2="37"
        strokeWidth="8"
        className="stroke-white dark:stroke-content-light"
      />
    </svg>
  );
}
