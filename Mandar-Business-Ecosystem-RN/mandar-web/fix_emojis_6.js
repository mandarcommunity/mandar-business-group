const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

// The price text looks something like `,1120 <span`
content = content.replace(/<div className="text-\[13px\] font-bold text-slate-900 mb-2">\s*.*?(<span className="text-\[9px\] font-normal text-slate-500">\/pkt<\/span>)\s*<\/div>/g, 
  `<div className="text-[13px] font-bold text-slate-900 mb-2">
                          ₹120 <span className="text-[9px] font-normal text-slate-500">/pkt</span>
                        </div>`);

content = content.replace(/<div className="text-\[13px\] font-bold text-slate-900 mb-2">\s*.*?(<span className="text-\[9px\] font-normal text-slate-500">\/ltr<\/span>)\s*<\/div>/g, 
  `<div className="text-[13px] font-bold text-slate-900 mb-2">
                          ₹750 <span className="text-[9px] font-normal text-slate-500">/ltr</span>
                        </div>`);

content = content.replace(/<div className="text-\[13px\] font-bold text-slate-900 mb-2">\s*.*?(<span className="text-\[9px\] font-normal text-slate-500">\/kg<\/span>)\s*<\/div>/g, 
  `<div className="text-[13px] font-bold text-slate-900 mb-2">
                          ₹450 <span className="text-[9px] font-normal text-slate-500">/kg</span>
                        </div>`);

// Also fix the Send Enquiry button
content = content.replace(/<button className="w-full bg-white border border-blue-600 text-blue-600 rounded-lg py-1\.5 text-\[9px\] font-bold flex items-center justify-center gap-1(.*?)">\s*.*Send Enquiry\s*<\/button>/g, 
  `<button className="w-full bg-white border border-blue-600 text-blue-600 rounded-lg py-1.5 text-[9px] font-bold flex items-center justify-center gap-1$1">
                          ✉ Send Enquiry
                        </button>`);

// Fix View All
content = content.replace(/<span className="text-\[9px\] text-blue-600 font-bold">.*<\/span>/g, '<span className="text-[9px] text-blue-600 font-bold">View All →</span>');

fs.writeFileSync(pageFile, content, 'utf8');
