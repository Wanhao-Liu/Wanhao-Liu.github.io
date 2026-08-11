import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredPages = [
  'index.html', 'en/index.html', 'zh/index.html',
  'en/selected-publications/index.html', 'zh/selected-publications/index.html',
  'en/publications/index.html', 'zh/publications/index.html',
  'en/projects/index.html', 'zh/projects/index.html',
  'robots.txt', 'sitemap.xml',
];

for (const page of requiredPages) {
  if (!fs.existsSync(path.join(root, 'out', page))) throw new Error(`Missing exported page: ${page}`);
}

const english = fs.readFileSync(path.join(root, 'out', 'en', 'index.html'), 'utf8');
const chinese = fs.readFileSync(path.join(root, 'out', 'zh', 'index.html'), 'utf8');
const selectedPublications = fs.readFileSync(path.join(root, 'out', 'en', 'selected-publications', 'index.html'), 'utf8');
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
  'Awards',
  'Academic Honors',
  'Outstanding Student Leader Award',
  'National Second Prize',
  'My research focuses on embodied intelligence and medical robotics, particularly Vision-Language-Action and World-Action Models for surgical video prediction, endoscopic navigation, and robot-assisted intervention.',
  '/images/LWH-2026.jpg',
]) {
  if (!english.includes(signal)) throw new Error(`English homepage missing: ${signal}`);
}
if (!english.includes('<a href="/en/publications/">Publications</a>')) throw new Error('English navigation is not labeled Publications.');
if (!english.includes('<a href="/en/selected-publications/">Selected Publications</a>')) throw new Error('English navigation is missing Selected Publications.');
if (english.includes('class="home-section home-publications"')) throw new Error('Homepage still renders publication rows.');
for (const signal of ['刘皖皓', '研究方向', '获奖荣誉', '优秀学生干部', '全国二等奖', '我的研究聚焦于具身智能与医疗机器人，重点研究用于手术视频预测、内窥镜导航和机器人辅助介入的视觉-语言-动作模型与世界动作模型。', '/zh/publications/', '/en/']) {
  if (!chinese.includes(signal)) throw new Error(`Chinese homepage missing: ${signal}`);
}
const selectedTitles = [
  'CrossScope: A Role-Asymmetric World Model for Joint Dual-Scope Surgical Video Prediction',
  'AC-MASAC: An Attentive Curriculum Learning Framework for Heterogeneous UAV Swarm Coordination',
  'Surg-UniWorld: A Unified Surgical World Model with Multimodal Control Experts',
  'EndoWAM: A Grounded World-Action Model for Generalizable Endoscopic Navigation',
];
const selectedPositions = selectedTitles.map((title) => selectedPublications.indexOf(title));
if (selectedPositions.some((position) => position === -1) || selectedPositions.some((position, index) => index > 0 && position <= selectedPositions[index - 1])) {
  throw new Error('Selected Publications page is missing the required four-work order.');
}
if (!selectedPublications.includes('https://jinsonglin-cuhk.github.io/renlab-project-homepages/EndoWAM/#viewpoint-invariance')) {
  throw new Error('Selected Publications page is missing the EndoWAM webpage.');
}
if (selectedPublications.includes('NCGR: Noise-Conditional Gated Rectification for Camera Extrinsic Perturbations in BEV 3D Object Detection')) {
  throw new Error('NCGR must not appear on the Selected Publications page.');
}
const surgLatTitle = 'SurgLAT: Surgical Latent Attention Tracking for Depth-Aware Robotic Laparoscope Control';
if (selectedPublications.includes(surgLatTitle)) throw new Error('SurgLAT must not appear on the Selected Publications page.');
if ((selectedPublications.match(/class="publication-row"/g) ?? []).length !== 4) throw new Error('Selected Publications must contain exactly four works.');
for (const signal of [
  surgLatTitle,
  '2608.07876',
  'https://surglat-home-page.pages.dev/',
  'SurgLAT/pipeline.png',
  '<span>Rulin Zhou</span><sup>#</sup>',
  '<span>Qiujie Song</span><sup>#</sup>',
  '<span>Yujie Ma</span><sup>#</sup>',
  '<span>Hongliang Ren</span><sup>*</sup>',
  '2608.06770',
  '2608.03895',
  '2608.03211',
  '2608.01221',
  'Surg-UniWorld/poster.png',
  '<details',
]) {
  if (!publications.includes(signal)) throw new Error(`Publications page missing: ${signal}`);
}
if (publications.indexOf(surgLatTitle) > publications.indexOf('Surg-UniWorld: A Unified Surgical World Model with Multimodal Control Experts')) {
  throw new Error('SurgLAT must be the first publication.');
}
if ((publications.match(/class="publication-row"/g) ?? []).length !== 9) throw new Error('Publications page must contain exactly nine works.');
for (const signal of ['lang="zh-CN"', '"@type":"ScholarlyArticle"', 'property="og:locale" content="zh_CN"']) {
  if (!chinesePublications.includes(signal)) throw new Error(`Chinese publications page missing: ${signal}`);
}
if (!sitemap.includes('<loc>https://wanhao-liu.github.io/</loc>')) throw new Error('Sitemap is missing the root locale entry.');
if (!sitemap.includes('<loc>https://wanhao-liu.github.io/en/selected-publications/</loc>') || !sitemap.includes('<loc>https://wanhao-liu.github.io/zh/selected-publications/</loc>')) {
  throw new Error('Sitemap is missing Selected Publications routes.');
}
if (publications.includes('<details open')) throw new Error('A publication abstract is open by default.');
if (!fs.existsSync(path.join(root, 'out', 'cv', 'Wanhao_Liu_CV.pdf'))) throw new Error('CV is missing from export.');

console.log(`Verified ${requiredPages.length} exported routes, bilingual signals, publication resources, and CV.`);
