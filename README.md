# Portfolio Website

A Next.js portfolio website built for GitHub Pages deployment.

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To build the static site for GitHub Pages:

```bash
pnpm run build
```

This will generate a static export in the `out` directory.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site when you push to the `master` branch.

1. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. Push your changes to the `master` branch:

```bash
git add .
git commit -m "Deploy portfolio"
git push origin master
```

The workflow will automatically build and deploy your site.

### Manual Deployment

1. Build the static site:

```bash
pnpm run build
```

2. The `out` directory contains the static files. You can:
   - Push the `out` directory to the `gh-pages` branch, or
   - Use GitHub Pages to serve from the `out` directory

## Project Structure

```
/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   ├── projects/     # Projects page
│   └── contact/      # Contact page
├── components/       # React components
│   ├── TopNavBar.tsx
│   ├── HeroSection.tsx
│   ├── StatsSection.tsx
│   ├── ExperienceSection.tsx
│   └── Footer.tsx
└── public/           # Static assets
```

## Technologies

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Material Symbols Icons

## License

All rights reserved.
