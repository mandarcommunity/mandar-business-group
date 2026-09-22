const fs = require('fs');
let file = 'src/screens/ExploreScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'import {\n  industries,\n} from "../data/industries";',
  'import { useIndustries } from "../hooks/useIndustries";'
);

content = content.replace(
  'import { industries } from "../data/industries";',
  'import { useIndustries } from "../hooks/useIndustries";'
);

content = content.replace(
  'export default function ExploreScreen() {',
  'export default function ExploreScreen() {\n  const { industryObjects: industries } = useIndustries();'
);

fs.writeFileSync(file, content, 'utf8');
