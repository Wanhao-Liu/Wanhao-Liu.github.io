import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SiteHeader from '@/components/layout/SiteHeader';

vi.mock('next/navigation', () => ({
  usePathname: () => '/zh/publications/',
}));

describe('SiteHeader', () => {
  beforeEach(() => localStorage.clear());

  it('persists the selected locale when switching languages', () => {
    render(<SiteHeader locale="zh" />);

    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '打开导航' }));
    expect(screen.getByRole('button', { name: '关闭导航' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: '移动端导航' })).toBeInTheDocument();
    const languageLink = screen.getAllByRole('link', { name: 'Switch to English' })[0];
    languageLink.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(languageLink);

    expect(localStorage.getItem('locale')).toBe('en');
  });

  it('matches the reference navigation and segmented locale control', () => {
    const { container } = render(<SiteHeader locale="en" />);

    expect(screen.getByRole('link', { name: 'Selected Publications' })).toHaveAttribute('href', '/en/selected-publications');
    expect(screen.getByRole('link', { name: 'Publications' })).toHaveAttribute('href', '/en/publications');
    expect(container.querySelector('.locale-switch')).toBeInTheDocument();
    expect(screen.getAllByText('EN').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Switch to Chinese' }).length).toBeGreaterThan(0);
  });
});
