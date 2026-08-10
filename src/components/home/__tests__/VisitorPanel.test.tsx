import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import VisitorPanel from '@/components/home/VisitorPanel';

vi.mock('@/components/home/VisitorMap', () => ({ default: () => <div data-testid="visitor-map" /> }));

describe('VisitorPanel', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('loads and formats the GoatCounter total', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: '1234' }) });
    vi.stubGlobal('fetch', fetchMock);

    render(<VisitorPanel locale="en" />);

    expect(screen.getByRole('heading', { name: 'Visitors' })).toBeInTheDocument();
    expect(await screen.findByText('1,234')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('https://wanhao.goatcounter.com/counter/TOTAL.json', expect.objectContaining({ signal: expect.any(AbortSignal) }));
    expect(screen.getByRole('link', { name: 'View stats' })).toHaveAttribute('href', 'https://wanhao.goatcounter.com');
  });

  it('keeps a stable fallback when GoatCounter is unavailable', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('offline'));
    vi.stubGlobal('fetch', fetchMock);

    render(<VisitorPanel locale="zh" />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '访客' })).toBeInTheDocument();
  });
});
