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

const awards = {
  academic: [
    { title: 'First-Class Scholarship', organization: 'Guangdong University of Technology', period: 'Sep 2024 - Sep 2025', detail: 'Top 3%' },
    { title: 'Outstanding Student Leader Award', organization: 'Guangdong University of Technology', period: 'Sep 2024 - Sep 2025' },
    { title: 'Advanced Individual Award', organization: 'Guangdong University of Technology', period: 'Sep 2023 - Sep 2024' },
  ],
  competitions: [
    { title: 'National Second Prize', organization: 'National University Students Smart Car Competition', period: 'Jun 2025 - Sep 2025', detail: 'Top 5% out of 200+ teams' },
    { title: 'Third Prize', organization: 'National University Student Smart Car Competition, South China Division', period: 'Jul 2024 - Aug 2024' },
  ],
};

describe('AcademicHome', () => {
  it('uses the reference profile and content grid', () => {
    const { container } = render(<AcademicHome locale="en" about={about} news={[{ date: '2026-08', content: 'New paper released.' }]} awards={awards} />);

    expect(container.querySelector('.home-grid')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Wanhao Liu profile' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Research Interests' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent News' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Awards' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Academic Honors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Competitions' })).toBeInTheDocument();
    expect(screen.getByText('Outstanding Student Leader Award')).toBeInTheDocument();
    expect(screen.getByText('National Second Prize')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Selected Publications' })).not.toBeInTheDocument();
    expect(container.querySelector('.home-publications')).not.toBeInTheDocument();
    expect(screen.getByText('Medical robotics research')).toBeInTheDocument();
    expect(screen.getByText('Electronic Science and Technology')).toBeInTheDocument();
  });

});
