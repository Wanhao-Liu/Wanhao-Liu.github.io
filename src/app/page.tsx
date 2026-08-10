import Link from 'next/link';

const localeScript = `
  try {
    const saved = localStorage.getItem('locale');
    const locale = saved === 'zh' || (!saved && navigator.language.toLowerCase().startsWith('zh')) ? 'zh' : 'en';
    location.replace('/' + locale + '/');
  } catch (_) {
    location.replace('/en/');
  }
`;

export default function LocaleEntry() {
  return (
    <main className="locale-entry">
      <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      <h1>Wanhao Liu 刘皖皓</h1>
      <p><Link href="/en/">English</Link><span>·</span><Link href="/zh/">中文</Link></p>
    </main>
  );
}
