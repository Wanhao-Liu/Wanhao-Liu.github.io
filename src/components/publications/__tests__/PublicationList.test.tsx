import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PublicationList from '@/components/publications/PublicationList';
import type { Publication } from '@/types/publication';

const publication: Publication = {
  id: 'demo',
  title: 'Demo World-Action Model',
  authors: [
    { name: 'First Author', isCoAuthor: true },
    { name: 'Wanhao Liu', isCoAuthor: true, isHighlighted: true },
    { name: 'Senior Author', isCorresponding: true },
  ],
  year: 2026,
  type: 'preprint',
  status: 'published',
  tags: ['Medical Robotics'],
  researchArea: 'machine-learning',
  abstract: 'A test abstract.',
  webpage: 'https://example.com',
  pdfUrl: 'https://example.com/paper.pdf',
  arxivId: '2608.00001',
  preview: 'NCGR/pipeline.png',
};

describe('PublicationList', () => {
  it('renders complete authors and resources with the abstract collapsed', () => {
    const { container } = render(<PublicationList publications={[publication]} locale="en" compact />);
    expect(screen.getByText('Demo World-Action Model')).toBeInTheDocument();
    expect(screen.getByText('Wanhao Liu')).toHaveClass('me');
    expect(screen.getByRole('link', { name: 'Webpage' })).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByRole('link', { name: 'PDF' })).toHaveAttribute('href', 'https://example.com/paper.pdf');
    expect(screen.getByRole('link', { name: 'arXiv' })).toHaveAttribute('href', 'https://arxiv.org/abs/2608.00001');
    expect(container.querySelector('details')).not.toHaveAttribute('open');
  });

  it('filters publications by search query', async () => {
    render(<PublicationList publications={[publication]} locale="en" />);
    fireEvent.change(screen.getByPlaceholderText('Search publications'), { target: { value: 'unrelated' } });
    expect(await screen.findByText('No publications match these filters.')).toBeInTheDocument();
    expect(screen.queryByText('Demo World-Action Model')).not.toBeInTheDocument();
  });

  it('filters publications by year', async () => {
    const olderPublication = {
      ...publication,
      id: 'older-demo',
      title: 'Earlier Robotics Paper',
      year: 2024,
    };

    render(<PublicationList publications={[publication, olderPublication]} locale="en" />);
    fireEvent.change(screen.getByRole('combobox', { name: 'All years' }), { target: { value: '2024' } });

    expect(await screen.findByText('Earlier Robotics Paper')).toBeInTheDocument();
    expect(screen.queryByText('Demo World-Action Model')).not.toBeInTheDocument();
  });

  it('loads only the first publication preview eagerly', () => {
    const secondPublication = {
      ...publication,
      id: 'second-demo',
      title: 'Second Robotics Paper',
    };

    render(<PublicationList publications={[publication, secondPublication]} locale="en" compact />);

    const previews = screen.getAllByRole('img');
    expect(previews[0]).toHaveAttribute('loading', 'eager');
    expect(previews[1]).toHaveAttribute('loading', 'lazy');
  });

  it('starts an eligible desktop preview video', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    render(<PublicationList publications={[{ ...publication, preview: undefined, video: 'https://example.com/demo.mp4' }]} locale="en" compact />);
    await waitFor(() => expect(play).toHaveBeenCalled());
    play.mockRestore();
  });

  it('waits until a video enters the viewport before playing', async () => {
    let notifyIntersection: ((entries: Array<{ isIntersecting: boolean }>) => void) | undefined;
    class IntersectionObserverMock {
      constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) { notifyIntersection = callback; }
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();

    render(<PublicationList publications={[{ ...publication, video: 'https://example.com/demo.mp4' }]} locale="en" compact />);
    await screen.findByLabelText('Demo World-Action Model preview');
    expect(play).not.toHaveBeenCalled();

    act(() => notifyIntersection?.([{ isIntersecting: true }]));
    await waitFor(() => expect(play).toHaveBeenCalled());

    play.mockRestore();
    vi.unstubAllGlobals();
  });

  it('falls back to the poster when video playback fails', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValue(new Error('blocked'));
    render(<PublicationList publications={[{ ...publication, video: 'https://example.com/demo.mp4' }]} locale="en" compact />);

    await waitFor(() => expect(play).toHaveBeenCalled());
    expect(await screen.findByRole('img', { name: 'Demo World-Action Model overview' })).toBeInTheDocument();

    play.mockRestore();
  });
});
