const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(landingFile, 'utf8');

content = content.replace(/<span className="text-2xl mb-1">\?\?<\/span>/g, '<Package className="w-6 h-6 text-slate-400 mb-1" />');

fs.writeFileSync(landingFile, content, 'utf8');
