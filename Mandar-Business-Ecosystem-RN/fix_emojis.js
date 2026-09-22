const fs = require('fs');

const utilsFile = 'mandar-web/lib/utils.js';
let utilsCode = fs.readFileSync(utilsFile, 'utf8');

const getEmojiStr = `import { INDUSTRY_ICONS } from '../constants/industryIcons';
export function getIndustryEmoji(name) {
  return INDUSTRY_ICONS[name] || "??";
}
`;

utilsCode = utilsCode.replace(/import \{ Search.*?from 'lucide-react';[\s\S]*?return Briefcase;\n\}/, getEmojiStr);
fs.writeFileSync(utilsFile, utilsCode, 'utf8');

const landingFile = 'mandar-web/components/LandingPageClient.jsx';
let landingContent = fs.readFileSync(landingFile, 'utf8');
landingContent = landingContent.replace('import { slugify, getIndustryIcon } from "../lib/utils";', 'import { slugify, getIndustryEmoji } from "../lib/utils";');
landingContent = landingContent.replace(
  /\{.*?const IconComponent = getIndustryIcon.*?return <IconComponent.*?\/>;.*?\}/s,
  `<span className="text-3xl">{getIndustryEmoji(industry)}</span>`
);
fs.writeFileSync(landingFile, landingContent, 'utf8');

const indFile = 'mandar-web/app/industries/page.js';
let indContent = fs.readFileSync(indFile, 'utf8');
indContent = indContent.replace('import { slugify, getIndustryIcon } from \'../../lib/utils\';', 'import { slugify, getIndustryEmoji } from \'../../lib/utils\';');
indContent = indContent.replace(
  /\{.*?const Icon = getIndustryIcon.*?return <Icon.*?\/>;.*?\}/s,
  `<span className="text-xl">{getIndustryEmoji(industry)}</span>`
);
fs.writeFileSync(indFile, indContent, 'utf8');
