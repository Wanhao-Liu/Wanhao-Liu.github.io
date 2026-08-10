import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AcademicHome from '@/components/home/AcademicHome';
import type { AboutContent } from '@/lib/siteContent';
import type { Publication } from '@/types/publication';

const about: AboutContent = {
  intro: 'Research assistant working on medical robotics.',
  research: 'World-action models for robotic intervention.',
  interests: ['Medical Robotics', 'World-Action Models'],
  education: [{ institution: 'Guangdong University of Technology', degree: 'B.Eng.', period: '2023 - 2027', detail: 'Electronic Science and Technology' }],
  experience: [{ institution: 'The Chinese University of Hong Kong', role: 'Research Assistant', period: '2026 - Present', detail: 'Medical robotics research' }],
};

const selectedPublications: Publication[] = [
  ['zhou2026surguniworld', 'Surg-UniWorld: A Unified Surgical World Model with Multimodal Control Experts'],
  ['pan2026ncgr', 'NCGR: Noise-Conditional Gated Rectification for Camera Extrinsic Perturbations in BEV 3D Object Detection'],
  ['liu2026crossscope', 'CrossScope: A Role-Asymmetric World Model for Joint Dual-Scope Surgical Video Prediction'],
  ['lin2026endowam', 'EndoWAM: A Grounded World-Action Model for Generalizable Endoscopic Navigation'],
  ['liu2026acmasac', 'AC-MASAC: An Attentive Curriculum Learning Framework for Heterogeneous UAV Swarm Coordination'],
].map(([id, title]) => ({
  id,
  title,
  authors: [{ name: 'Wanhao Liu' }],
  year: 2026,
  type: 'preprint',
  status: 'published',
  tags: [],
  researchArea: 'machine-learning',
  selected: true,
}));

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

  it('renders selected publications in the requested homepage order', () => {
    const { container } = render(<AcademicHome locale="en" about={about} news={[]} publications={selectedPublications} />);
    const titles = [...container.querySelectorAll('.home-publications .publication-copy h3')].map((heading) => heading.textContent);

    expect(titles).toEqual([
      'CrossScope: A Role-Asymmetric World Model for Joint Dual-Scope Surgical Video Prediction',
      'AC-MASAC: An Attentive Curriculum Learning Framework for Heterogeneous UAV Swarm Coordination',
      'Surg-UniWorld: A Unified Surgical World Model with Multimodal Control Experts',
      'EndoWAM: A Grounded World-Action Model for Generalizable Endoscopic Navigation',
    ]);
    expect(titles).not.toContain('NCGR: Noise-Conditional Gated Rectification for Camera Extrinsic Perturbations in BEV 3D Object Detection');
  });
});
