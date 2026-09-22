const fs = require('fs');
const pageFile = 'app/industry/[slug]/page.js';
let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(/primary_phone/g, 'mobile');

fs.writeFileSync(pageFile, content, 'utf8');
