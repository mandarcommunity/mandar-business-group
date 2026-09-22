const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(landingFile, 'utf8');

// 1. Change Mandar Hub to Mandar Business Group
content = content.replace(/Mandar <span className="text-yellow-400">Hub<\/span>/, 'Mandar <span className="text-yellow-400">Business Group</span>');

// 2. Change Hamburger ☰ to Mustache Man 👨🏻
content = content.replace(/<span className="text-sm">☰<\/span>/, '<span className="text-sm">👨🏻</span>');

// 3. Change Products
// The products block has 3 products (one duplicated).
// Card 1: Tomato -> Khakhra
// Card 2: Wheat -> Cow Ghee
// Card 3: Tomato -> Premium Coffee

content = content.replace(/<div className="h-20 bg-red-50 rounded-xl flex items-center justify-center text-4xl mb-2">\s*🍅\s*<\/div>/, '<div className="h-20 bg-orange-50 rounded-xl flex items-center justify-center text-4xl mb-2">\n                        🍘\n                      </div>');
content = content.replace(/<h4 className="text-\[11px\] font-extrabold text-slate-900 mt-3 truncate">Fresh Tomatoes<\/h4>/, '<h4 className="text-[11px] font-extrabold text-slate-900 mt-3 truncate">Khakhra (Roasted)</h4>');
content = content.replace(/<div className="text-\[8px\] text-slate-500 mb-1">Vegetables & Fruits<\/div>/, '<div className="text-[8px] text-slate-500 mb-1">Snacks & Namkeen</div>');
content = content.replace(/₹18 <span className="text-\[9px\] font-normal text-slate-500">\/kg<\/span>/, '₹120 <span className="text-[9px] font-normal text-slate-500">/pkt</span>');

content = content.replace(/<div className="h-20 bg-amber-50 rounded-xl flex items-center justify-center text-4xl mb-2">\s*🌾\s*<\/div>/, '<div className="h-20 bg-yellow-50 rounded-xl flex items-center justify-center text-4xl mb-2">\n                        🧈\n                      </div>');
content = content.replace(/<h4 className="text-\[11px\] font-extrabold text-slate-900 mt-3 truncate">Premium Wheat<\/h4>/, '<h4 className="text-[11px] font-extrabold text-slate-900 mt-3 truncate">Pure Cow Ghee</h4>');
content = content.replace(/<div className="text-\[8px\] text-slate-500 mb-1">Grains & Cereals<\/div>/, '<div className="text-[8px] text-slate-500 mb-1">Dairy & Oils</div>');
content = content.replace(/₹28 <span className="text-\[9px\] font-normal text-slate-500">\/kg<\/span>/, '₹750 <span className="text-[9px] font-normal text-slate-500">/ltr</span>');

// Card 3 (Duplicate Tomato)
content = content.replace(/<div className="h-20 bg-red-50 rounded-xl flex items-center justify-center text-4xl mb-2">\s*🍅\s*<\/div>/, '<div className="h-20 bg-stone-100 rounded-xl flex items-center justify-center text-4xl mb-2">\n                        ☕\n                      </div>');
content = content.replace(/<h4 className="text-\[11px\] font-extrabold text-slate-900 mt-3 truncate">Fresh Tomatoes<\/h4>/, '<h4 className="text-[11px] font-extrabold text-slate-900 mt-3 truncate">Premium Coffee</h4>');
content = content.replace(/<div className="text-\[8px\] text-slate-500 mb-1">Vegetables & Fruits<\/div>/, '<div className="text-[8px] text-slate-500 mb-1">Beverages</div>');
content = content.replace(/₹18 <span className="text-\[9px\] font-normal text-slate-500">\/kg<\/span>/, '₹450 <span className="text-[9px] font-normal text-slate-500">/kg</span>');

fs.writeFileSync(landingFile, content, 'utf8');
