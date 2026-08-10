import type { Metadata } from 'next';
import GoatCounterScript from '@/components/analytics/GoatCounterScript';
import './globals.css';

const siteUrl = 'https://wanhao-liu.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Wanhao Liu | Robotics Researcher', template: '%s | Wanhao Liu' },
  description: 'Research in embodied intelligence, robot learning, medical robotics, Vision-Language-Action models, and World-Action Models.',
  authors: [{ name: 'Wanhao Liu', url: siteUrl }],
  creator: 'Wanhao Liu',
  openGraph: {
    type: 'website',
    siteName: 'Wanhao Liu Academic Homepage',
    images: [{ url: '/images/LWH.jpg', width: 800, height: 800, alt: 'Wanhao Liu' }],
  },
  icons: { icon: '/images/Agent.png' },
};

const themeScript = `
  try {
    const saved = localStorage.getItem('theme');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
  }
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}<GoatCounterScript /></body>
    </html>
  );
}
