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
const chineseSelectedPublications = fs.readFileSync(path.join(root, 'out', 'zh', 'selected-publications', 'index.html'), 'utf8');
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
  'Academic Service',
  'Journal Reviewing',
  'Conference Reviewing',
  'IEEE Transactions on Mobile Computing (TMC)',
  'IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)',
  'International Conference on Autonomous Agents and Multiagent Systems (AAMAS)',
  'My research focuses on embodied intelligence and medical robotics, particularly Vision-Language-Action and World-Action Models for surgical video prediction, endoscopic navigation, and robot-assisted intervention.',
  '/images/LWH-2026.jpg',
  'Project pages for SurgCast and RoPE-Flow are now featured on my homepage.',
  'Last updated<!-- --> <!-- -->October 2026',
]) {
  if (!english.includes(signal)) throw new Error(`English homepage missing: ${signal}`);
}
if (!english.includes('<a href="/en/publications/">Publications</a>')) throw new Error('English navigation is not labeled Publications.');
if (!english.includes('<a href="/en/selected-publications/">Selected Publications</a>')) throw new Error('English navigation is missing Selected Publications.');
if (english.includes('class="home-section home-publications"')) throw new Error('Homepage still renders publication rows.');
for (const [html, title, organization, period, detail] of [
  [english, 'National Scholarship', 'Ministry of Education of China', 'Sep 2025 - Sep 2026', 'Top 0.3%'],
  [chinese, '国家奖学金', '中华人民共和国教育部', '2025年9月 - 2026年9月', '前 0.3%'],
]) {
  const awardSection = html.match(/<section id="awards"[\s\S]*?<\/ul>/)?.[0] ?? '';
  const award = [...awardSection.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => match[1]).find((row) => row.includes(`<strong>${title}</strong>`));
  if (!award) throw new Error(`Homepage academic honors missing: ${title}`);
  for (const signal of [organization, period, detail]) {
    if (!award.includes(signal)) throw new Error(`${title}: missing ${signal}`);
  }
}
for (const signal of ['刘皖皓', '研究方向', '获奖荣誉', '优秀学生干部', '全国二等奖', '学术服务', '期刊审稿', '会议审稿', '我的研究聚焦于具身智能与医疗机器人，重点研究用于手术视频预测、内窥镜导航和机器人辅助介入的视觉-语言-动作模型与世界动作模型。', 'SurgCast 与 RoPE-Flow 的项目主页已加入精选论文。', '2026年10月', '/zh/publications/', '/en/']) {
  if (!chinese.includes(signal)) throw new Error(`Chinese homepage missing: ${signal}`);
}
const selectedTitles = [
  'SurgCast: Action-Conditioned Future Skeletons for Controllable Surgical World Models',
  'CrossScope: A Role-Asymmetric World Model for Joint Dual-Scope Surgical Video Prediction',
  'AC-MASAC: An Attentive Curriculum Learning Framework for Heterogeneous UAV Swarm Coordination',
  'RoPE-Flow: Monocular Vision-based Robot Pose Estimation via 2D Graph-Conditioned 3D Flow Matching',
  'Surg-UniWorld: A Unified Surgical World Model with Multimodal Control Experts',
  'EndoWAM: A Grounded World-Action Model for Generalizable Endoscopic Navigation',
];
const publicationRows = (html) => [...html.matchAll(/<article class="publication-row">([\s\S]*?)<\/article>/g)].map((match) => match[1]);
for (const html of [selectedPublications, chineseSelectedPublications]) {
  const rows = publicationRows(html);
  if (rows.length !== 6 || rows.some((row, index) => !row.includes(selectedTitles[index]))) {
    throw new Error('Selected Publications must contain six works in the requested order in both languages.');
  }
}
if (!selectedPublications.includes('https://jinsonglin-cuhk.github.io/renlab-project-homepages/EndoWAM/#viewpoint-invariance')) {
  throw new Error('Selected Publications page is missing the EndoWAM webpage.');
}
if (selectedPublications.includes('NCGR: Noise-Conditional Gated Rectification for Camera Extrinsic Perturbations in BEV 3D Object Detection')) {
  throw new Error('NCGR must not appear on the Selected Publications page.');
}
const surgLatTitle = 'SurgLAT: Surgical Latent Attention Tracking for Depth-Aware Robotic Laparoscope Control';
if (selectedPublications.includes(surgLatTitle)) throw new Error('SurgLAT must not appear on the Selected Publications page.');
const newWorks = [
  {
    title: selectedTitles[0],
    authors: ['Wanhao Liu', 'Rulin Zhou', 'Liangjing Shao', 'Zhaocheng Lin', 'Dongyue Li', 'Jinsong Lin', 'Zhiqing Tang', 'Jingchen', 'Panshuo Li', 'Hongliang Ren'],
    signals: ['href="https://wanhao-liu.github.io/Surgcast/"', 'SurgCast/poster.webp', 'SurgCast.pdf?v=20260927-2', '<span class="me">Wanhao Liu</span><sup>#</sup>', '<span>Rulin Zhou</span><sup>#</sup>', '<span>Liangjing Shao</span><sup>#</sup>', '<span>Hongliang Ren</span><sup>*</sup>'],
    video: 'https://wanhao-liu.github.io/Surgcast/static/videos/overview/surgcast-overview.mp4?v=20260926-silent',
  },
  {
    title: selectedTitles[3],
    authors: ['Liangjing Shao', 'Wanhao Liu', 'Zhiwei Fang', 'Rulin Zhou', 'Quanlu Zhang', 'Changjing Liu', 'Beilei Cui', 'Yiming Huang', 'Hongliang Ren'],
    signals: ['href="https://ropeflow.netlify.app/"', 'RoPE-Flow/poster.webp', '<span>Hongliang Ren</span><sup>*</sup>'],
    video: 'https://ropeflow.netlify.app/static/videos/teaser_video.mp4',
  },
];
for (const html of [selectedPublications, chineseSelectedPublications, publications, chinesePublications]) {
  for (const work of newWorks) {
    const row = publicationRows(html).find((item) => item.includes(work.title));
    if (!row) throw new Error(`Missing new publication: ${work.title}`);
    if (!row.includes('<p class="publication-venue">arXiv preprint')) throw new Error(`${work.title}: incorrect venue label.`);
    for (const signal of work.signals) {
      if (!row.includes(signal)) throw new Error(`${work.title}: missing ${signal}`);
    }
    const authorMarkup = row.match(/<p class="publication-authors">([\s\S]*?)<\/p>/)?.[1] ?? '';
    const authors = [...authorMarkup.matchAll(/<span(?: class="me")?>([^<]+)<\/span>/g)].map((match) => match[1]);
    if (JSON.stringify(authors) !== JSON.stringify(work.authors)) throw new Error(`${work.title}: incorrect author order or spelling.`);
    if (!html.includes(work.video)) throw new Error(`${work.title}: missing video in client data.`);
  }
}
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
  throw new Error('SurgLAT must precede Surg-UniWorld.');
}
for (const html of [publications, chinesePublications]) {
  if (publicationRows(html).length !== 12) throw new Error('Publications must contain twelve works in both languages.');
  if (!publicationRows(html)[0].includes(selectedTitles[0])) throw new Error('SurgCast must be the first full-list publication.');
}
const flowModeTitle = 'FlowMoDE: Coarse-to-fine Flow Matching for Structure-aware Sim-to-Real Monocular Depth Estimation';
for (const html of [publications, chinesePublications]) {
  const row = publicationRows(html).find((item) => item.includes(flowModeTitle));
  if (!row) throw new Error('FlowMoDE is missing from the full publication list.');
  for (const signal of ['href="https://flowmode-shao.netlify.app/"', 'FlowMoDE/poster.webp', '<p class="publication-venue">Submitted to ICRA 2027', '2026', '<span>Hongliang Ren</span><sup>*</sup>']) {
    if (!row.includes(signal)) throw new Error(`FlowMoDE: missing ${signal}`);
  }
  const authorMarkup = row.match(/<p class="publication-authors">([\s\S]*?)<\/p>/)?.[1] ?? '';
  const authors = [...authorMarkup.matchAll(/<span(?: class="me")?>([^<]+)<\/span>/g)].map((match) => match[1]);
  if (JSON.stringify(authors) !== JSON.stringify(['Liangjing Shao', 'Wanhao Liu', 'Jinsong Lin', 'Zhiwei Fang', 'Hongliang Ren'])) {
    throw new Error('FlowMoDE: incorrect author order or spelling.');
  }
  if (!html.includes('https://flowmode-shao.netlify.app/static/videos/demo.mp4')) throw new Error('FlowMoDE: missing video in client data.');
  if (row.includes('arxiv.org')) throw new Error('FlowMoDE must not include a placeholder arXiv or PDF link.');
}
for (const html of [selectedPublications, chineseSelectedPublications]) {
  if (publicationRows(html).some((row) => row.includes(flowModeTitle))) throw new Error('FlowMoDE must not change the six requested selections.');
}
for (const poster of ['SurgCast/poster.webp', 'RoPE-Flow/poster.webp', 'FlowMoDE/poster.webp']) {
  if (!fs.existsSync(path.join(root, 'out', 'images', poster))) throw new Error(`Missing exported video fallback: ${poster}`);
}
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
