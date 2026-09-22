const fs = require('fs');
let file = 'src/components/business/BusinessActionBar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    /message: `Check out \$\{businessName \|\| "this business"\} on Mandar Community Ecosystem!\\n\\nhttps:\/\/mandarcommunity\.in\/biz\/\$\{slug \|\| businessId\}`/,
    'message: `Check out ${businessName || "this business"}, Contact details: Phone: ${phone || "N/A"}, WhatsApp: ${whatsapp || "N/A"} on Mandar Community Ecosystem!\\n\\nhttps://mandarcommunity.in/biz/${slug || businessId}`'
);

fs.writeFileSync(file, content);
console.log("Fixed Share Message in ActionBar!");
