const fs = require('fs');
const content = fs.readFileSync('src/data/industries.ts', 'utf8');

// We need to extract the INDUSTRY_ICONS object and export it for web
const match = content.match(/const INDUSTRY_ICONS: Record<string, string> = (\{[\s\S]*?\});/);
if (match) {
  const iconsCode = `export const INDUSTRY_ICONS = ${match[1]};`;
  fs.writeFileSync('mandar-web/constants/industryIcons.js', iconsCode, 'utf8');
}
