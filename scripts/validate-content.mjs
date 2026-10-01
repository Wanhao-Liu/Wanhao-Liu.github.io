import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@retorquere/bibtex-parser';
const root = process.cwd();
const source = fs.readFileSync(path.join(root, 'content', 'publications.bib'), 'utf8');
const parsed = parse(source);
if (parsed.errors.length) throw new Error(`BibTeX parse errors: ${JSON.stringify(parsed.errors)}`);
const entries = parsed.entries;

if (entries.length !== 12) throw new Error(`Expected 12 publications, found ${entries.length}.`);

for (const entry of entries) {
  const fields = entry.fields;
  for (const required of ['title', 'author', 'year', 'abstract']) {
    if (!fields[required] || (typeof fields[required] === 'string' && !fields[required].trim())) throw new Error(`${entry.key}: missing ${required}.`);
  }
  if (!fields.pdf && !(fields.status === 'submitted' && fields.webpage)) {
    throw new Error(`${entry.key}: missing PDF destination (submitted work may link to its project page).`);
  }
  if (!fields.preview && !fields.video) throw new Error(`${entry.key}: missing publication media.`);
  if (fields.video && !fields.poster && !fields.preview) throw new Error(`${entry.key}: missing video fallback image.`);
  for (const mediaField of ['preview', 'poster']) {
    if (fields[mediaField]) {
      const mediaPath = path.join(root, 'public', 'images', fields[mediaField]);
      if (!fs.existsSync(mediaPath)) throw new Error(`${entry.key}: missing ${mediaField} file ${fields[mediaField]}.`);
    }
  }
}

const requiredSignals = [
  'Wanhao Liu# and Rulin Zhou# and Liangjing Shao#',
  'Liangjing Shao and Wanhao Liu and Zhiwei Fang',
  'Dongyue Li and Jinsong Lin and Zhiqing Tang',
  'https://wanhao-liu.github.io/Surgcast/static/videos/overview/surgcast-overview.mp4?v=20260926-silent',
  'https://ropeflow.netlify.app/static/videos/teaser_video.mp4',
  'Liangjing Shao and Wanhao Liu and Jinsong Lin and Zhiwei Fang and Hongliang Ren*',
  'https://flowmode-shao.netlify.app/static/videos/demo.mp4',
  'Rulin Zhou# and Wanhao Liu#',
  'Wenbin Pan# and Wanhao Liu#',
  'Wanhao Liu# and Jinsong Lin# and Rulin Zhou# and Chi Kit Ng#',
  'Jinsong Lin# and Zikang Pan# and Wanhao Liu# and Chi Kit Ng#',
  'https://surg-uniworld.pages.dev/videos/control-modalities-model-comparison.mp4',
  'https://wanhao-liu.github.io/CrossScope/static/videos/final_en_subtitled_compact.mp4',
];
for (const signal of requiredSignals) {
  if (!source.includes(signal)) throw new Error(`Publication source missing required signal: ${signal}`);
}

console.log(`Validated ${entries.length} publications and all local media references.`);
