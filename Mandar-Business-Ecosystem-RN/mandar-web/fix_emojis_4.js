const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

// Use regex to catch the corrupted rupee symbol
content = content.replace(/.*?1120 <span/g, '                          ₹120 <span');
content = content.replace(/.*?1750 <span/g, '                          ₹750 <span');
content = content.replace(/.*?1450 <span/g, '                          ₹450 <span');

content = content.replace(/.*? Send Enquiry/g, '                          ✉ Send Enquiry');
content = content.replace(/View All .*?<\/span>/g, 'View All →</span>');

fs.writeFileSync(pageFile, content, 'utf8');
