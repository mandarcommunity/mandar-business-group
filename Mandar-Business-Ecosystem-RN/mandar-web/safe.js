const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let landingContent = fs.readFileSync(landingFile, 'utf8');

// Replace the imports
landingContent = landingContent.replace('import { slugify, getIndustryIcon } from "../lib/utils";', 'import { slugify, getIndustryEmoji } from "../lib/utils";');

// Safe replace for the icon render logic
const oldIconRender = `{(() => {
                      const Icon = getIndustryIcon(industry);
                      return <Icon className="w-8 h-8" />;
                    })()}`;

// Actually wait, let's look at what's in the file!
