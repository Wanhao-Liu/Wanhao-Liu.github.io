import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AcademicHome from '@/components/home/AcademicHome';
import type { AboutContent } from '@/lib/siteContent';

const about: AboutContent = {
  intro: 'Research assistant working on medical robotics.',
  research: 'World-action models for robotic intervention.',
  interests: ['Medical Robotics', 'World-Action Models'],
  education: [{ institution: 'Guangdong University of Technology', degree: 'B.Eng.', period: '2023 - 2027', detail: 'Electronic Science and Technology' }],
  experience: [{ institution: 'The Chinese University of Hong Kong', role: 'Research Assistant', period: '2026 - Present', detail: 'Medical robotics research' }],
};

describe('AcademicHome', () => {
  it('uses the reference profile and content grid', () => {
    const { container } = render(<AcademicHome locale="en" about={about} news={[{ date: '2026-08', content: 'New paper released.' }]} publications={[]} />);

    expect(container.querySelector('.home-grid')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Wanhao Liu profile' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Research Interests' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent News' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Selected Publications' })).toBeInTheDocument();
    expect(screen.getByText('Medical robotics research')).toBeInTheDocument();
    expect(screen.getByText('Electronic Science and Technology')).toBeInTheDocument();
  });
});
