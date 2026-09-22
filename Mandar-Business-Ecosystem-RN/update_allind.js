const fs = require('fs');
let file = 'src/screens/AllIndustriesScreen.tsx';
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
  'export default function AllIndustriesScreen() {',
  'export default function AllIndustriesScreen() {\n  const { industryObjects: industries } = useIndustries();'
);

fs.writeFileSync(file, content, 'utf8');
