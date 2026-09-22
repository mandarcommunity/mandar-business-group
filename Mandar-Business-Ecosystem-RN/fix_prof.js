const fs = require('fs');
let prof = fs.readFileSync('src/screens/BusinessProfileScreen.tsx', 'utf8');
prof = prof.replace(
    '          website: data.website || "",',
    '          website: data.website || "",\n          slug: data.slug,'
);
fs.writeFileSync('src/screens/BusinessProfileScreen.tsx', prof);
console.log("Injected slug into BusinessProfileScreen!");
