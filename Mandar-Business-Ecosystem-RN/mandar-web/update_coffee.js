const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

// Replace Coffee emoji box (stone-100)
content = content.replace(
  /<div className="h-20 bg-stone-100 rounded-xl flex items-center justify-center text-4xl mb-2">[\s\S]*?<\/div>/,
  `<div className="h-20 bg-slate-100 rounded-xl overflow-hidden mb-2">
                          <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=200&q=80" alt="Premium Coffee" className="w-full h-full object-cover" />
                        </div>`
);

fs.writeFileSync(pageFile, content, 'utf8');
