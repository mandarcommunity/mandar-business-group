const fs = require('fs');

function replaceRegex(file, pattern, newStr) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(pattern, newStr);
        fs.writeFileSync(file, content);
        console.log("Enhanced", file);
    }
}

// 1. LeadsScreen (Others' Requirements)
// lead.title
replaceRegex('src/screens/LeadsScreen.tsx',
    /Share\.share\(\{ message: `Check out this requirement lead.*?\)\;/gs,
    'Share.share({ message: `Check out this requirement lead for "${lead.title}" on Mandar Community Ecosystem.\\n\\nhttps://mandarcommunity.in/req/${lead.slug || lead.id}` });'
);

// 2. AdvertisementDetailsScreen (Others' Ads)
// advertisement.title
replaceRegex('src/screens/AdvertisementDetailsScreen.tsx',
    /Share\.share\(\{ message: `Check out this advertisement.*?\)\;/gs,
    'Share.share({ message: `Check out this advertisement: "${advertisement?.title || "Special Offer"}" on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/ad/${advertisement?.slug || advertisement?.id}` });'
);

// 3. BusinessCatalogScreen (Others' Products)
// item.name
replaceRegex('src/screens/BusinessCatalogScreen.tsx',
    /Share\.share\(\{ message: `Check out this product.*?\)\;/gs,
    'Share.share({ message: `Check out the product "${item.name}" on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/p/${item.slug || item.id}` });'
);

