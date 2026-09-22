const fs = require('fs');
let file = 'src/screens/BusinessProfileScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /businessName=\{\s*business\.businessName\s*\}/m,
    'businessName={business.businessName}\n                businessId={business.id}\n                slug={business.slug}'
);

fs.writeFileSync(file, content);
console.log("Fixed Profile Screen Props via Regex!");
