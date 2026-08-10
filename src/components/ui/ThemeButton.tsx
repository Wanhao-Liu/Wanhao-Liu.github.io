'use client';

import { Moon, Sun } from 'lucide-react';

export default function ThemeButton({ label }: { label: string }) {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button type="button" className="icon-button" onClick={toggleTheme} aria-label={label} title={label}>
      <Moon className="theme-moon" size={18} />
      <Sun className="theme-sun" size={18} />
    </button>
  );
}
