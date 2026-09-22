const fs = require('fs');
const file = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(file, 'utf8');

// Insert imports right after "use client";
content = content.replace('"use client";', `"use client";
import { INDUSTRIES } from "../constants/industries";
export function slugify(text) { return text.toString().toLowerCase().replace(/\\s+/g, "-").replace(/[^\\w\\-]+/g, "").replace(/\\-\\-+/g, "-").replace(/^-+/, "").replace(/-+$/, ""); }
`);

fs.writeFileSync(file, content, 'utf8');
