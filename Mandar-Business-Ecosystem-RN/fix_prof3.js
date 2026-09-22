const fs = require('fs');
let file = 'src/screens/BusinessProfileScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /website:\s*data\.website\s*\|\|\s*"",/m,
    'website: data.website || "",\n          slug: data.slug,'
);

fs.writeFileSync(file, content);
console.log("Injected slug into Profile Screen via Regex!");
