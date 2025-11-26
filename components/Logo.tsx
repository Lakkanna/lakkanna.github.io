interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 24 }: LogoProps) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} glow`}
      width={size}
      height={size}
    >
      <path
        d="
        M 0,0
        L 48,0
        L 48,48
        L 0,48
        Z
      "
      />
      <line x1="14" y1="8" x2="14" y2="34" stroke="white" strokeWidth="10" />
      <line x1="19" y1="37" x2="40" y2="37" stroke="white" strokeWidth="8" />
    </svg>
  );
}
