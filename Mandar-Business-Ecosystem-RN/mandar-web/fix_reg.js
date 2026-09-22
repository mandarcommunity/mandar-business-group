const fs = require('fs');
const indFile = 'app/industries/page.js';
let indContent = fs.readFileSync(indFile, 'utf8');

const regex = /\{\(\(\) => \{\s*const Icon = getIndustryIcon\(industry\);\s*return <Icon className="w-5 h-5" \/>;\s*\}\)\(\)\}/s;
const newHtml = `<span className="text-xl">{getIndustryEmoji(industry)}</span>`;

indContent = indContent.replace(regex, newHtml);
fs.writeFileSync(indFile, indContent, 'utf8');
