const fs = require('fs');
let path = 'mandar-web/app/directory/page.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  ".select('id, business_name, slug, profile_image, city, state, verified, industries, description, contact_person')",
  ".select('id, business_name, slug, profile_image, city, state, verified, industries, description, contact_person, products(name)')"
);

fs.writeFileSync(path, content, 'utf8');
console.log("page.js updated!");
