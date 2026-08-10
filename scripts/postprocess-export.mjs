import fs from 'node:fs';
import path from 'node:path';

const chineseRoot = path.join(process.cwd(), 'out', 'zh');

for (const relativePath of fs.readdirSync(chineseRoot, { recursive: true })) {
  if (typeof relativePath !== 'string' || !relativePath.endsWith('.html')) continue;
  const filePath = path.join(chineseRoot, relativePath);
  const html = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, html.replace('<html lang="en"', '<html lang="zh-CN"'));
}

console.log('Applied zh-CN document language to Chinese static pages.');
