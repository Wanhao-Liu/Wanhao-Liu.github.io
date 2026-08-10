import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@retorquere/bibtex-parser';
const root = process.cwd();
const source = fs.readFileSync(path.join(root, 'content', 'publications.bib'), 'utf8');
const parsed = parse(source);
if (parsed.errors.length) throw new Error(`BibTeX parse errors: ${JSON.stringify(parsed.errors)}`);
const entries = parsed.entries;

if (entries.length !== 8) throw new Error(`Expected 8 publications, found ${entries.length}.`);

for (const entry of entries) {
  const fields = entry.fields;
  for (const required of ['title', 'author', 'year', 'abstract']) {
    if (!fields[required] || (typeof fields[required] === 'string' && !fields[required].trim())) throw new Error(`${entry.key}: missing ${required}.`);
  }
  if (!fields.pdf) throw new Error(`${entry.key}: missing PDF destination.`);
  if (!fields.preview && !fields.video) throw new Error(`${entry.key}: missing publication media.`);
  for (const mediaField of ['preview', 'poster']) {
    if (fields[mediaField]) {
      const mediaPath = path.join(root, 'public', 'images', fields[mediaField]);
      if (!fs.existsSync(mediaPath)) throw new Error(`${entry.key}: missing ${mediaField} file ${fields[mediaField]}.`);
    }
  }
}

const requiredSignals = [
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
