const fs = require('fs');

const f1 = 'components/LandingPageClient.jsx';
let c1 = fs.readFileSync(f1, 'utf8');
c1 = c1.replace('export function slugify(text) { return text.toString().toLowerCase().replace(/\\s+/g, "-").replace(/[^\\w\\-]+/g, "").replace(/\\-\\-+/g, "-").replace(/^-+/, "").replace(/-+$/, ""); }', 'import { slugify } from "../lib/utils";');
fs.writeFileSync(f1, c1, 'utf8');

const f2 = 'app/industries/page.js';
let c2 = fs.readFileSync(f2, 'utf8');
c2 = c2.replace('import { slugify } from \'../../components/LandingPageClient\';', 'import { slugify } from \'../../lib/utils\';');
fs.writeFileSync(f2, c2, 'utf8');

const f3 = 'app/industry/[slug]/page.js';
let c3 = fs.readFileSync(f3, 'utf8');
c3 = c3.replace('import { slugify } from \'../../../components/LandingPageClient\';', 'import { slugify } from \'../../../lib/utils\';');
fs.writeFileSync(f3, c3, 'utf8');
