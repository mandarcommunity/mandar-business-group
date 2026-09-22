const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

// Replace Khakhra emoji box
content = content.replace(
  /<div className="h-20 bg-orange-50 rounded-xl flex items-center justify-center text-4xl mb-2">[\s\S]*?<\/div>/,
  `<div className="h-20 bg-slate-100 rounded-xl overflow-hidden mb-2">
                          <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=200&q=80" alt="Khakhra" className="w-full h-full object-cover" />
                        </div>`
);

// Replace Ghee emoji box (yellow-50)
content = content.replace(
  /<div className="h-20 bg-yellow-50 rounded-xl flex items-center justify-center text-4xl mb-2">[\s\S]*?<\/div>/,
  `<div className="h-20 bg-slate-100 rounded-xl overflow-hidden mb-2">
                          <img src="https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=200&q=80" alt="Pure Cow Ghee" className="w-full h-full object-cover" />
                        </div>`
);

// Replace Coffee emoji box (amber-50)
content = content.replace(
  /<div className="h-20 bg-amber-50 rounded-xl flex items-center justify-center text-4xl mb-2">[\s\S]*?<\/div>/,
  `<div className="h-20 bg-slate-100 rounded-xl overflow-hidden mb-2">
                          <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=200&q=80" alt="Premium Coffee" className="w-full h-full object-cover" />
                        </div>`
);

fs.writeFileSync(pageFile, content, 'utf8');
