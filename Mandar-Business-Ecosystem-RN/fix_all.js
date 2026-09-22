const fs = require('fs');

function replaceStr(file, oldStr, newStr) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(oldStr, newStr);
        fs.writeFileSync(file, content);
        console.log("Updated", file);
    }
}

function replaceRegex(file, pattern, newStr) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(pattern, newStr);
        fs.writeFileSync(file, content);
        console.log("Regex Updated", file);
    }
}

// 1. BusinessDirectoryScreen
replaceRegex('src/screens/BusinessDirectoryScreen.tsx',
    /Share\.share\(\{ message: `Check out \$\{business\.business_name\}.*?\)\;/gs,
    'Share.share({ message: `Check out ${business.businessName}, Contact details: Phone: ${business.phone || "N/A"}, WhatsApp: ${business.whatsapp || "N/A"} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/biz/${business.slug || business.id}` });'
);

// 2. SavedBusinessesScreen
replaceRegex('src/screens/SavedBusinessesScreen.tsx',
    /Share\.share\(\{ message: `Check out \$\{business\.business_name\}.*?\)\;/gs,
    'Share.share({ message: `Check out ${business.businessName}, Contact details: Phone: ${business.phone || "N/A"}, WhatsApp: ${business.whatsapp || "N/A"} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/biz/${business.slug || business.id}` });'
);

// 3. MyProductsScreen
replaceRegex('src/screens/MyProductsScreen.tsx',
    /Share\.share\(\{ message: `Check out my product \$\{item\.name\}.*?\)\;/gs,
    'Share.share({ message: `Check out my product ${product.name} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/p/${product.slug || product.id}` });'
);

// 4. MyAdvertisementsScreen
// Wait, what is the variable in MyAdvertisementsScreen? Let's assume it's 'ad' because of my grep before... Wait, was it 'item'? Oh, `ad.slug`! Let me fix it.
replaceRegex('src/screens/MyAdvertisementsScreen.tsx',
    /Share\.share\(\{ message: `Check out my advertisement.*?\)\;/gs,
    'Share.share({ message: `Check out my advertisement on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/ad/${ad.slug || ad.id}` });'
);

// 5. AdvertisementDetailsScreen
replaceRegex('src/screens/AdvertisementDetailsScreen.tsx',
    /Share\.share\(\{ message: `Check out this advertisement.*?\)\;/gs,
    'Share.share({ message: `Check out this advertisement on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/ad/${advertisement?.slug || advertisement?.id}` });'
);

// 6. MyRequirementsScreen
replaceRegex('src/screens/MyRequirementsScreen.tsx',
    /Share\.share\(\{ message: `I have a requirement for \$\{item\.title\}.*?\)\;/gs,
    'Share.share({ message: `I have a requirement for ${requirement.title} on Mandar Community Ecosystem.\\n\\nhttps://mandarcommunity.in/req/${requirement.slug || requirement.id}` });'
);

// 7. BusinessActionBar
replaceRegex('src/components/business/BusinessActionBar.tsx',
    /Check out \$\{businessName \|\| "this business"\} on Mandar Community Ecosystem!\\n\\nhttps:\/\/mandarcommunity\.in\/biz\/\$\{businessId\}/g,
    'Check out ${businessName || "this business"} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/biz/${businessId}'
);
// The action bar is actually mostly correct since it takes businessId. The user says "profile share krne pr - Property 'businessId' doesn't exist", let's check what it really takes.

