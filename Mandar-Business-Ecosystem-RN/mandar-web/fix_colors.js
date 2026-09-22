const fs = require('fs');
const file = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the old array declaration cleanly
const fixRegex = /const colors = \[\s*"bg-blue-100[\s\S]*?\/\/\s*"bg-blue-50[\s\S]*?\];/;
const newColors = `const colors = [
              "bg-blue-100 text-blue-600",
              "bg-purple-100 text-purple-600",
              "bg-emerald-100 text-emerald-600",
              "bg-orange-100 text-orange-600",
              "bg-pink-100 text-pink-600",
              "bg-indigo-100 text-indigo-600",
              "bg-yellow-100 text-yellow-600",
            ];`;
            
content = content.replace(fixRegex, newColors);
fs.writeFileSync(file, content, 'utf8');
