const fs = require('fs');
let file = 'src/screens/ExploreScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '}, [search]);',
  '}, [search, industries]);'
);

fs.writeFileSync(file, content, 'utf8');

let allIndFile = 'src/screens/AllIndustriesScreen.tsx';
let allIndContent = fs.readFileSync(allIndFile, 'utf8');
allIndContent = allIndContent.replace(
  '}, [searchQuery]);',
  '}, [searchQuery, industries]);'
);
fs.writeFileSync(allIndFile, allIndContent, 'utf8');
