const fs = require('fs');
let file = 'backend/src/controllers/admin.controller.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/supabaseAdmin/g, 'supabase');

fs.writeFileSync(file, content, 'utf8');
