const fs = require('fs');
const indFile = 'app/industries/page.js';
let indContent = fs.readFileSync(indFile, 'utf8');

indContent = indContent.replace('import { slugify, getIndustryIcon } from \'../../lib/utils\';', 'import { slugify, getIndustryEmoji } from \'../../lib/utils\';');

const oldHtml = `{(() => {
                      const Icon = getIndustryIcon(industry);
                      return <Icon className="w-5 h-5" />;
                    })()}`;

const newHtml = `<span className="text-xl">{getIndustryEmoji(industry)}</span>`;
indContent = indContent.replace(oldHtml, newHtml);
fs.writeFileSync(indFile, indContent, 'utf8');
