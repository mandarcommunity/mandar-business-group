const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

// The corrupted rupee symbol seems to be "," or ",". Let's just replace all corrupted rupees.
content = content.replace(/,1120/g, '₹120');
content = content.replace(/,1750/g, '₹750');
content = content.replace(/,1450/g, '₹450');

// Replace corrupted "Send Enquiry" icon 
content = content.replace(/dY' Send Enquiry/g, '✉ Send Enquiry');

// Replace corrupted "View All" arrow
content = content.replace(/View All \+'/g, 'View All →');

fs.writeFileSync(pageFile, content, 'utf8');
