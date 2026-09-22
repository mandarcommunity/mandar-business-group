const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let landingContent = fs.readFileSync(landingFile, 'utf8');

landingContent = landingContent.replace('import { slugify, getIndustryIcon } from "../lib/utils";', 'import { slugify, getIndustryEmoji } from "../lib/utils";');

const oldCode = `{(() => {
                      const IconComponent = getIndustryIcon(industry);
                      return <IconComponent className="w-8 h-8" />;
                    })()}`;

const newCode = `<span className="text-3xl">{getIndustryEmoji(industry)}</span>`;

landingContent = landingContent.replace(oldCode, newCode);
fs.writeFileSync(landingFile, landingContent, 'utf8');
