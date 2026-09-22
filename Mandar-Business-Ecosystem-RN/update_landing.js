const fs = require('fs');
let file = 'mandar-web/components/LandingPageClient.jsx';
let content = fs.readFileSync(file, 'utf8');

// Remove static imports
content = content.replace(
  'import { INDUSTRIES } from "../constants/industries";',
  ''
);

content = content.replace(
  'import { slugify, getIndustryEmoji } from "../lib/utils";',
  'import { slugify } from "../lib/utils";'
);

// Add industries prop
content = content.replace(
  'export default function LandingPageClient({ businesses }) {',
  'export default function LandingPageClient({ businesses, industries }) {'
);

// Fix industries map
content = content.replace(
  /\{INDUSTRIES\.map\(\(industry, i\) => \{/g,
  '{industries.map((industry, i) => {'
);

content = content.replace(
  /INDUSTRIES\.length/g,
  'industries.length'
);

// Fix the Link href inside map
content = content.replace(
  /<Link href=\{\`\/industry\/\$\{slugify\(industry\)\}\`\} key=\{industry\} className="shrink-0 snap-start">/g,
  '<Link href={`/industry/${industry.slug}`} key={industry.id} className="shrink-0 snap-start">'
);

// Fix the name and emoji rendering inside map
content = content.replace(
  /<span className="text-3xl">\{getIndustryEmoji\(industry\)\}<\/span>/g,
  '<span className="text-3xl">{industry.emoji}</span>'
);

content = content.replace(
  /<h3 className="font-extrabold text-slate-900 mb-1">\{industry\}<\/h3>/g,
  '<h3 className="font-extrabold text-slate-900 mb-1">{industry.name}</h3>'
);

// We need to write this back
fs.writeFileSync(file, content, 'utf8');
