import Image from 'next/image';
import Link from 'next/link';
import { FileText, Github, GraduationCap, Mail } from 'lucide-react';
import type { Locale } from '@/lib/siteContent';
import VisitorPanel from '@/components/home/VisitorPanel';

export default function ProfileSidebar({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';

  return (
    <aside className="profile-sidebar" aria-label={zh ? '刘皖皓个人资料' : 'Wanhao Liu profile'}>
      <div className="sidebar-portrait">
        <Image src="/images/LWH-2026.jpg" alt={zh ? '刘皖皓' : 'Wanhao Liu'} fill priority sizes="256px" />
      </div>
      <div className="sidebar-identity">
        <h1>{zh ? '刘皖皓' : 'Wanhao Liu'}</h1>
        <p className="sidebar-role">{zh ? '研究助理' : 'Research Assistant'}</p>
        <p className="sidebar-institution">{zh ? '香港中文大学' : 'The Chinese University of Hong Kong'}</p>
      </div>
      <div className="sidebar-links" aria-label={zh ? '个人链接' : 'Profile links'}>
        <Link href="mailto:liuwanhao@mails.gdut.edu.cn" aria-label="Email" title="Email"><Mail /></Link>
        <Link href="https://scholar.google.com/citations?hl=en&user=zaRHAjgAAAAJ" target="_blank" aria-label="Google Scholar" title="Google Scholar"><GraduationCap /></Link>
        <Link href="https://github.com/Wanhao-Liu" target="_blank" aria-label="GitHub" title="GitHub"><Github /></Link>
        <Link href="/cv/Wanhao_Liu_CV.pdf" target="_blank" aria-label={zh ? '简历' : 'Curriculum Vitae'} title={zh ? '简历' : 'Curriculum Vitae'}><FileText /></Link>
      </div>
      <VisitorPanel locale={locale} />
    </aside>
  );
}
