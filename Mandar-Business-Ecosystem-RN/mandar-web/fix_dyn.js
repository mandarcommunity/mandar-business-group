const fs = require('fs');
const pageFile = 'app/biz/[slug]/page.js';
let content = fs.readFileSync(pageFile, 'utf8');

if (!content.includes('force-dynamic')) {
  content = "export const dynamic = 'force-dynamic';\nexport const revalidate = 0;\n" + content;
  fs.writeFileSync(pageFile, content, 'utf8');
}
