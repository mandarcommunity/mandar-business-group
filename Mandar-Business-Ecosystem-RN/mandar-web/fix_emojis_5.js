const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(/,1120/g, '₹120');
content = content.replace(/,1750/g, '₹750');
content = content.replace(/,1450/g, '₹450');
content = content.replace(/dY'/g, '✉');

fs.writeFileSync(pageFile, content, 'utf8');
