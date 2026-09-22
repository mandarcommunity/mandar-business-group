const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(landingFile, 'utf8');

content = content.replace(
  /<div className="text-xl font-extrabold tracking-tight flex items-center gap-1">/g, 
  '<div className="text-[15px] font-extrabold tracking-tight flex items-center gap-1 whitespace-nowrap">'
);

fs.writeFileSync(landingFile, content, 'utf8');
