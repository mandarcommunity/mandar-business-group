const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(landingFile, 'utf8');

content = content.replace(/Khakhra \(Roasted\)/g, 'Khakhra');
content = content.replace(/Pure Cow Ghee/g, 'Cow Ghee');
content = content.replace(/Premium Coffee/g, 'Coffee');

fs.writeFileSync(landingFile, content, 'utf8');
