const fs = require('fs');

function injectSlug(file) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(
            'whatsapp: b.mobile || b.user?.mobile,',
            'whatsapp: b.mobile || b.user?.mobile,\n        slug: b.slug,'
        );
        fs.writeFileSync(file, content);
        console.log("Injected slug into", file);
    }
}

injectSlug('src/screens/BusinessDirectoryScreen.tsx');
injectSlug('src/screens/SavedBusinessesScreen.tsx');
