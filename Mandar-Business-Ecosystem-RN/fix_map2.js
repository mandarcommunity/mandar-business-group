const fs = require('fs');

// 1. LeadsScreen
let leads = fs.readFileSync('src/screens/LeadsScreen.tsx', 'utf8');
leads = leads.replace(
    'location: `${req.city}, ${req.state}`,',
    'location: `${req.city}, ${req.state}`,\n          slug: req.slug,'
);
fs.writeFileSync('src/screens/LeadsScreen.tsx', leads);

// 2. AdvertisementDetailsScreen
let adDetails = fs.readFileSync('src/screens/AdvertisementDetailsScreen.tsx', 'utf8');
adDetails = adDetails.replace(
    'tags: ["Active"],',
    'tags: ["Active"],\n            slug: ad.slug,'
);
fs.writeFileSync('src/screens/AdvertisementDetailsScreen.tsx', adDetails);
console.log("Fixed missing slugs in mapping!");
