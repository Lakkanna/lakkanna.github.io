/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0d59f2",
        "background-light": "#f5f6f8",
        "background-dark": "#101622",
        "content-light": "#111318",
        "content-dark": "#e5e7eb",
        "card-light": "rgba(255, 255, 255, 0.7)",
        "card-dark": "rgba(23, 31, 49, 0.5)",
        "border-light": "#e2e8f0",
        "border-dark": "rgba(55, 65, 81, 0.6)",
        "text-light": "#111318",
        "text-dark": "#f5f6f8",
        "subtext-light": "#606e8a",
        "subtext-dark": "#94a3b8",
      },
      fontFamily: {
        "display": ["var(--font-dank-mono)", "monospace"],
        "mono": ["var(--font-dank-mono)", "monospace"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
      },
      backdropBlur: {
        'xl': '24px',
      },
    },
  },
  plugins: [],
}

