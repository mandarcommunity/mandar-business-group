const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

// Replace {INDUSTRIES.slice(0, 15).map((industry, i) => { with {INDUSTRIES.map((industry, i) => {
content = content.replace(/\{INDUSTRIES\.slice\(0, 15\)\.map/g, '{INDUSTRIES.map');

// Remove the Explore All card from the carousel
const exploreAllCardRegex = /<Link href="\/industries"[\s\S]*?<span className="font-bold">Explore All \{INDUSTRIES\.length\}<\/span>[\s\S]*?<\/Link>/g;
content = content.replace(exploreAllCardRegex, '');

fs.writeFileSync(pageFile, content, 'utf8');
