const fs = require('fs');
let file = 'mandar-web/app/industry/[slug]/page.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { INDUSTRIES } from '../../../constants/industries';",
  ""
);

content = content.replace(
  "import { slugify, getIndustryEmoji } from '../../../lib/utils';",
  ""
);

content = content.replace(
  "const industryName = INDUSTRIES.find(ind => slugify(ind) === slug);",
  "const { data: industryData } = await supabase.from('industries').select('*').eq('slug', slug).single();\n  const industryName = industryData?.name;"
);

content = content.replace(
  "const emoji = getIndustryEmoji(industryName);",
  "const emoji = industryData?.emoji || '??';"
);

fs.writeFileSync(file, content, 'utf8');
