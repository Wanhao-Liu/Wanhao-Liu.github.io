import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GoatCounterScript from '@/components/analytics/GoatCounterScript';

const { scriptSpy } = vi.hoisted(() => ({
  scriptSpy: vi.fn((props: React.ComponentProps<'script'> & { strategy?: string }) => <script {...props} />),
}));

vi.mock('next/script', () => ({ default: scriptSpy }));

describe('GoatCounterScript', () => {
  it('loads analytics through the framework script component', () => {
    render(<GoatCounterScript />);

    expect(scriptSpy).toHaveBeenCalledWith(expect.objectContaining({
      'data-goatcounter': 'https://wanhao.goatcounter.com/count',
      src: 'https://gc.zgo.at/count.js',
      strategy: 'afterInteractive',
    }), undefined);
  });
});
