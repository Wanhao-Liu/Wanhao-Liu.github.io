'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/siteContent';
import VisitorMap from '@/components/home/VisitorMap';

export default function VisitorPanel({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const [count, setCount] = useState<string>('—');

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://wanhao.goatcounter.com/counter/TOTAL.json', { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        const value = Number.parseInt(String(payload?.count ?? '').replaceAll(',', ''), 10);
        if (Number.isFinite(value)) setCount(new Intl.NumberFormat('en-US').format(value));
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return (
    <section className="visitor-panel">
      <div className="visitor-heading"><span /><h3>{zh ? '访客' : 'Visitors'}</h3></div>
      <div className="visitor-metrics">
        <div className="visitor-metric"><strong>{count}</strong><span>{zh ? '页面浏览量' : 'Page Views'}</span></div>
        <Link href="https://wanhao.goatcounter.com" target="_blank" aria-label={zh ? '查看统计' : 'View stats'}><strong>{zh ? '查看统计' : 'View stats'}</strong><span>GoatCounter</span></Link>
      </div>
      <VisitorMap locale={locale} />
    </section>
  );
}
