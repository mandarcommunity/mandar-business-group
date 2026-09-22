const fs = require('fs');
const pageFile = 'app/industry/[slug]/page.js';
let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(
  /<div className="relative w-full md:w-96">[\s\S]*?<\/div>/,
  `{/* Search placeholder removed to keep Server Component simple. Real search belongs in navbar. */}`
);

fs.writeFileSync(pageFile, content, 'utf8');
