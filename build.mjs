// build.mjs —— 从配置 yml 生成单文件 index.html
// 构建流程: links.personal.yml（fork 后自建，优先）或 links.example.yml + template.html → index.html
// 用法: node build.mjs
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const root = dirname(fileURLToPath(import.meta.url));

// ---------- 读取配置 ----------
// 优先读取 fork 用户自建的 links.personal.yml，否则回退到上游示例 links.example.yml
const configFile = ['links.personal.yml', 'links.example.yml'].find((f) => existsSync(join(root, f)));
if (!configFile) {
  throw new Error('未找到配置文件：请以 links.example.yml 为模板，创建 links.personal.yml');
}
const data = yaml.load(readFileSync(join(root, configFile), 'utf8')) || {};
console.log(`📄 使用配置: ${configFile}`);
if (!data.site) throw new Error(`${configFile} 缺少 site 配置`);
['socials', 'projects'].forEach((key) => {
  if (data[key] !== undefined && !Array.isArray(data[key])) {
    throw new Error(`${configFile} 中 ${key} 应为数组`);
  }
});
if (data.nav && !Array.isArray(data.nav.groups)) {
  throw new Error(`${configFile} 中 nav.groups 应为数组`);
}

// ---------- 生成 index.html（页面模板统一维护在 template.html） ----------
const template = readFileSync(join(root, 'template.html'), 'utf8');
const escAttr = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
const title = data.site.title || '个人引导页';
const desc = data.site.description || data.site.subtitle || '';
const image = /^https?:/.test(data.site.avatar || '') ? data.site.avatar : '';
const html = template
  .replace('<!DOCTYPE html>', `<!DOCTYPE html>\n<!-- 本文件由 build.mjs 自动生成（${configFile} + template.html），请勿手动修改 -->`)
  .replaceAll('__TITLE__', escAttr(title))
  .replaceAll('__DESC__', escAttr(desc))
  .replaceAll('__IMAGE__', escAttr(image))
  .replaceAll('__FAVICON__', escAttr(faviconOf(data.site.avatar)))
  .replaceAll('__DATA__', safeJson(data));
const leftover = html.match(/__[A-Z]+__/);
if (leftover) throw new Error(`template.html 存在未替换的占位符: ${leftover[0]}`);
writeFileSync(join(root, 'index.html'), html, 'utf8');

console.log(`✅ 已生成 index.html（${(html.length / 1024).toFixed(1)} KB）`);

function safeJson(obj) {
  // 防止 </script> 提前闭合
  return JSON.stringify(obj).replace(/<\//g, '<\\/');
}

// 站点 favicon：图片 URL 直用；emoji/文字则转 SVG data URI
function faviconOf(avatar) {
  const a = avatar || '';
  if (/^https?:/.test(a)) return a;
  // 按码点取首字符，避免 emoji 被 charAt 截断为孤立代理项导致 URIError
  const glyph = Array.from(a)[0] || '👤';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${glyph}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}


