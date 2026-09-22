const fs = require('fs');

function replaceFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace import
  content = content.replace(
    /import \{\s*INDUSTRIES,?\s*\} from "\.\.\/constants\/industries";/g,
    'import { useIndustries } from "../hooks/useIndustries";'
  );

  // Inject hook
  content = content.replace(
    /export default function (\w+)\(\) \{/,
    'export default function $1() {\n  const { industries: INDUSTRIES } = useIndustries();'
  );

  fs.writeFileSync(file, content, 'utf8');
}

replaceFile('src/screens/EditProfileScreen.tsx');
replaceFile('src/screens/SetupBusinessScreen.tsx');
