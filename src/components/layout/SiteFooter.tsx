import type { Locale } from '@/lib/siteContent';
import { getLabels } from '@/lib/labels';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const labels = getLabels(locale);
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Wanhao Liu</span>
      <span>{labels.updated} August 2026</span>
    </footer>
  );
}
