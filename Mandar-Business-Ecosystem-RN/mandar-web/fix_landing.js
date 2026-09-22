const fs = require('fs');
const file = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('import { slugify, getIndustryIcon } from "../lib/utils";', 'import { slugify, getIndustryEmoji } from "../lib/utils";');

const regex = /\{\(\(\) => \{\s*const IconComponent = getIndustryIcon\(industry\);\s*return <IconComponent className="w-8 h-8" \/>;\s*\}\)\(\)\}/s;
const newHtml = `<span className="text-3xl">{getIndustryEmoji(industry)}</span>`;
content = content.replace(regex, newHtml);

fs.writeFileSync(file, content, 'utf8');
