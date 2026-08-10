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
    expect(screen.getByRole('navigation', { name: '移动端导航' })).toBeInTheDocument();
    const languageLink = screen.getAllByRole('link', { name: '切换语言' })[0];
    languageLink.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(languageLink);

    expect(localStorage.getItem('locale')).toBe('en');
  });
});
