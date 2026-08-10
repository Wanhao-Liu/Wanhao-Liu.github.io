import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredPages = [
  'index.html', 'en/index.html', 'zh/index.html',
  'en/publications/index.html', 'zh/publications/index.html',
  'en/projects/index.html', 'zh/projects/index.html',
  'robots.txt', 'sitemap.xml',
];

for (const page of requiredPages) {
  if (!fs.existsSync(path.join(root, 'out', page))) throw new Error(`Missing exported page: ${page}`);
}

const english = fs.readFileSync(path.join(root, 'out', 'en', 'index.html'), 'utf8');
const chinese = fs.readFileSync(path.join(root, 'out', 'zh', 'index.html'), 'utf8');
const publications = fs.readFileSync(path.join(root, 'out', 'en', 'publications', 'index.html'), 'utf8');
const chinesePublications = fs.readFileSync(path.join(root, 'out', 'zh', 'publications', 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'out', 'sitemap.xml'), 'utf8');

for (const signal of [
  'Wanhao Liu',
  '/en/publications/',
  '/zh/',
  'hrefLang="zh-CN"',
  'https://wanhao.goatcounter.com/count',
  'Visitors',
  'visitor-map',
  'id="about"',
  'Selected Publications',
  '/images/LWH-2026.jpg',
  'https://jinsonglin-cuhk.github.io/renlab-project-homepages/EndoWAM/#viewpoint-invariance',
]) {
  if (!english.includes(signal)) throw new Error(`English homepage missing: ${signal}`);
}
if (!english.includes('<a href="/en/publications/">Publications</a>')) throw new Error('English navigation is not labeled Publications.');
if (english.includes('NCGR: Noise-Conditional Gated Rectification for Camera Extrinsic Perturbations in BEV 3D Object Detection')) {
  throw new Error('NCGR must not appear in the homepage selected publications.');
}
for (const signal of ['刘皖皓', '研究方向', '/zh/publications/', '/en/']) {
  if (!chinese.includes(signal)) throw new Error(`Chinese homepage missing: ${signal}`);
}
for (const signal of ['2608.06770', '2608.03895', '2608.03211', '2608.01221', 'Surg-UniWorld/poster.png', '<details']) {
  if (!publications.includes(signal)) throw new Error(`Publications page missing: ${signal}`);
}
for (const signal of ['lang="zh-CN"', '"@type":"ScholarlyArticle"', 'property="og:locale" content="zh_CN"']) {
  if (!chinesePublications.includes(signal)) throw new Error(`Chinese publications page missing: ${signal}`);
}
if (!sitemap.includes('<loc>https://wanhao-liu.github.io/</loc>')) throw new Error('Sitemap is missing the root locale entry.');
if (publications.includes('<details open')) throw new Error('A publication abstract is open by default.');
if (!fs.existsSync(path.join(root, 'out', 'cv', 'Wanhao_Liu_CV.pdf'))) throw new Error('CV is missing from export.');

console.log(`Verified ${requiredPages.length} exported routes, bilingual signals, publication resources, and CV.`);
