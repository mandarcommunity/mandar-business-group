const fs = require('fs');
const pageFile = 'app/industry/[slug]/page.js';
let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(
  /\.contains\('industries', \[industryName\]\)/g,
  ""
);

content = content.replace(
  /const emoji = getIndustryEmoji\(industryName\);/,
  `
  // Manual filter to bypass potential Supabase JSONB contains operator issues on free tier / anon keys
  const filteredBusinesses = businesses ? businesses.filter(b => b.industries && b.industries.includes(industryName)) : [];
  const emoji = getIndustryEmoji(industryName);
  `
);

content = content.replace(
  /\{businesses\?/g,
  '{filteredBusinesses?'
);

content = content.replace(
  /businesses\.map/g,
  'filteredBusinesses.map'
);

content = content.replace(
  /businesses\?\.length/g,
  'filteredBusinesses?.length'
);

fs.writeFileSync(pageFile, content, 'utf8');
