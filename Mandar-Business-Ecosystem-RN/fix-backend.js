const fs = require('fs');
const file = 'backend/src/services/business.service.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'profile_image: finalProfileImage,',
  'profile_image: body.profileImage,'
);

fs.writeFileSync(file, content, 'utf8');
