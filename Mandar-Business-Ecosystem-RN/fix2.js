const fs = require('fs');

// 1. Update BusinessActionBar.tsx
let action = fs.readFileSync('src/components/business/BusinessActionBar.tsx', 'utf8');
action = action.replace(
    '  businessName?: string;\n',
    '  businessName?: string;\n  businessId?: string;\n  slug?: string;\n'
);
action = action.replace(
    '  onCatalogPress,\n}: BusinessActionBarProps) => {\n',
    '  onCatalogPress,\n  businessId,\n  slug,\n}: BusinessActionBarProps) => {\n'
);
action = action.replace(
    'https://mandarcommunity.in/biz/${businessId}`',
    'https://mandarcommunity.in/biz/${slug || businessId}`'
);
fs.writeFileSync('src/components/business/BusinessActionBar.tsx', action);

// 2. Update BusinessProfileScreen.tsx
let prof = fs.readFileSync('src/screens/BusinessProfileScreen.tsx', 'utf8');
prof = prof.replace(
    '                whatsapp={\n                  business.whatsapp\n                }\n',
    '                whatsapp={\n                  business.whatsapp\n                }\n                businessId={business.id}\n                slug={business.slug}\n'
);
fs.writeFileSync('src/screens/BusinessProfileScreen.tsx', prof);

console.log("Fixed BusinessActionBar and ProfileScreen!");
