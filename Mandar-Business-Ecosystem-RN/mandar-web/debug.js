const fs = require('fs');
const pageFile = 'app/industry/[slug]/page.js';
let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(
  /\{businesses\?\.length \|\| 0\} Businesses Found/,
  `{businesses?.length || "NULL"} Total, {filteredBusinesses?.length || 0} Filtered`
);

fs.writeFileSync(pageFile, content, 'utf8');
