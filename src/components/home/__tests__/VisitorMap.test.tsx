import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import VisitorMap from '@/components/home/VisitorMap';

describe('VisitorMap', () => {
  afterEach(() => {
    document.querySelectorAll('[data-leaflet-css], [data-leaflet-js]').forEach((element) => element.remove());
    delete window.L;
  });

  it('keeps the fallback visible when Leaflet styles fail to load', async () => {
    const { container } = render(<VisitorMap locale="en" />);
    const map = container.querySelector('.visitor-map');
    const stylesheet = await waitFor(() => {
      const element = document.querySelector<HTMLLinkElement>('link[data-leaflet-css]');
      expect(element).toBeInTheDocument();
      return element!;
    });

    fireEvent.error(stylesheet);

    await waitFor(() => expect(map).toHaveAttribute('data-map-state', 'error'));
    expect(container.querySelector('.visitor-map-status')).toHaveTextContent('Visitor map');
  });
});
