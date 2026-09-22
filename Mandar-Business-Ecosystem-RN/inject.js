const fs = require('fs');

function inject(file) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('import { useIndustries }')) {
    content = 'import { useIndustries } from "../hooks/useIndustries";\n' + content;
    fs.writeFileSync(file, content, 'utf8');
  }
}

inject('src/screens/ExploreScreen.tsx');
inject('src/screens/AllIndustriesScreen.tsx');
inject('src/screens/EditProfileScreen.tsx');
inject('src/screens/SetupBusinessScreen.tsx');
