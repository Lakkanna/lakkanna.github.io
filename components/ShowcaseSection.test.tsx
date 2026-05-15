import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ShowcaseSection from './ShowcaseSection';

describe('ShowcaseSection', () => {
  it('renders the section heading', () => {
    render(<ShowcaseSection />);
    expect(
      screen.getByRole('heading', { name: /what i.ve built/i })
    ).toBeInTheDocument();
  });

  it('renders all three showcase items', () => {
    render(<ShowcaseSection />);
    expect(screen.getByText('CCA-F Mock Tests')).toBeInTheDocument();
    expect(screen.getByText('SVG Creator')).toBeInTheDocument();
    expect(screen.getByText('MyMacros')).toBeInTheDocument();
  });

  it('renders descriptions for each showcase item', () => {
    render(<ShowcaseSection />);
    expect(
      screen.getByText(/mock tests for claude certified architect/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/create and export svg illustrations/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ai-powered nutrition tracking/i)
    ).toBeInTheDocument();
  });

  it('renders links for each showcase item', () => {
    render(<ShowcaseSection />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(3);

    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('/architect-practice-lab/');
    expect(hrefs).toContain('/svg-maker/');
    expect(hrefs).toContain('https://noobstoday.netlify.app/');
  });

  it('opens external links in a new tab with safe rel attributes', () => {
    render(<ShowcaseSection />);
    const externalLink = screen
      .getAllByRole('link')
      .find(
        (link) =>
          link.getAttribute('href') === 'https://noobstoday.netlify.app/'
      );
    expect(externalLink).toBeDefined();
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders technology tags for each showcase item', () => {
    render(<ShowcaseSection />);
    expect(screen.getAllByText('Next.js').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
  });
});
