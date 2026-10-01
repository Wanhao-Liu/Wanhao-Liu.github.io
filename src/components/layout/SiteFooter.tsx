import type { Locale } from '@/lib/siteContent';
import { getLabels } from '@/lib/labels';
import { getConfig } from '@/lib/config';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const labels = getLabels(locale);
  const { site } = getConfig(locale);
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Wanhao Liu</span>
      <span>{labels.updated} {site.last_updated}</span>
    </footer>
  );
}
