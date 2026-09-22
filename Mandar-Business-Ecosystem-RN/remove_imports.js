const fs = require('fs');
const files = [
  'src/screens/ExploreScreen.tsx',
  'src/screens/AllIndustriesScreen.tsx',
  'src/screens/EditProfileScreen.tsx',
  'src/screens/SetupBusinessScreen.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import\s*\{\s*industries,?\s*\}\s*from\s*"..\/data\/industries";/g, '');
  content = content.replace(/import\s*\{\s*INDUSTRIES,?\s*\}\s*from\s*"..\/constants\/industries";/g, '');
  fs.writeFileSync(file, content, 'utf8');
});
