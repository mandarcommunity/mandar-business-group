const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

// Replace Khakhra image
content = content.replace(
  /https:\/\/images\.unsplash\.com\/photo-1565557623262-b51c2513a641\?auto=format&fit=crop&w=200&q=80/g,
  'https://i.ibb.co/MkMgsYtq/khakhra.webp'
);

// Replace Ghee image
content = content.replace(
  /https:\/\/images\.unsplash\.com\/photo-1589301760014-d929f39ce9b1\?auto=format&fit=crop&w=200&q=80/g,
  'https://i.ibb.co/7tr5QC2Q/Pure-cow-ghee.webp'
);

fs.writeFileSync(pageFile, content, 'utf8');
