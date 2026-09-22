const fs = require('fs');
const files = [
  'app/industry/[slug]/page.js',
  'app/biz/[slug]/page.js',
  'app/page.js'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/export const dynamic = 'force-dynamic';\n/g, '');
  content = content.replace(/export const revalidate = 0;/g, 'export const revalidate = 60;'); // 60 seconds ISR
  fs.writeFileSync(file, content, 'utf8');
}
