const fs = require('fs');
const file = 'backend/src/services/business.service.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/business_images/g, 'profiles');

fs.writeFileSync(file, content, 'utf8');
