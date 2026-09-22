const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(landingFile, 'utf8');

const regex = /\{\/\* Animated Cards Container \*\/\}[\s\S]*?\{\/\* Fade out gradient at bottom of feed \*\/\}/s;

const newHtml = `{/* Animated Cards Container */}
                  <motion.div 
                    animate={{ y: [0, -150, -300, -450, 0] }}
                    transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                    className="flex flex-col gap-4 pt-2"
                  >
                    {/* Card 1: Requirement */}
                    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">New Tender / Requirement</span>
                       </div>
                       <h4 className="font-extrabold text-slate-900 text-sm mb-1 leading-tight">Need 1000kg Premium Wheat</h4>
                       <p className="text-xs text-slate-500 mb-3">Delivery to Mumbai, Maharashtra</p>
                       <div className="w-full bg-slate-50 rounded-lg py-2 flex items-center justify-center border border-slate-100 text-xs font-bold text-slate-600">
                         Send Quotation
                       </div>
                    </div>

                    {/* Card 2: Verified Profile */}
                    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                           <Building2 className="w-5 h-5 text-blue-600" />
                         </div>
                         <div>
                           <h4 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1">
                             Jain Trademart
                             <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                           </h4>
                           <p className="text-[11px] text-slate-500">Agriculture & Farming</p>
                         </div>
                       </div>
                       <div className="w-full h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm text-xs font-bold text-white">
                         View Full Profile
                       </div>
                    </div>

                    {/* Card 3: Product Catalog */}
                    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                       <div className="flex items-center gap-2 mb-3">
                         <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                           <Package className="w-4 h-4 text-purple-600" />
                         </div>
                         <h4 className="font-bold text-slate-800 text-xs">New Products Added</h4>
                       </div>
                       <div className="flex gap-2">
                         <div className="w-1/2 bg-slate-50 border border-slate-100 rounded-xl p-2 flex flex-col items-center justify-center">
                           <span className="text-2xl mb-1">??</span>
                           <span className="text-[10px] font-semibold text-slate-600 text-center leading-tight">Cotton Yarn</span>
                         </div>
                         <div className="w-1/2 bg-slate-50 border border-slate-100 rounded-xl p-2 flex flex-col items-center justify-center">
                           <span className="text-2xl mb-1">??</span>
                           <span className="text-[10px] font-semibold text-slate-600 text-center leading-tight">Silk Thread</span>
                         </div>
                       </div>
                    </div>

                    {/* Card 4: Duplicate Requirement to make infinite loop smooth */}
                    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">New Tender / Requirement</span>
                       </div>
                       <h4 className="font-extrabold text-slate-900 text-sm mb-1 leading-tight">Need 1000kg Premium Wheat</h4>
                       <p className="text-xs text-slate-500 mb-3">Delivery to Mumbai, Maharashtra</p>
                       <div className="w-full bg-slate-50 rounded-lg py-2 flex items-center justify-center border border-slate-100 text-xs font-bold text-slate-600">
                         Send Quotation
                       </div>
                    </div>

                  </motion.div>

                  {/* Fade out gradient at bottom of feed */}`;

content = content.replace(regex, newHtml);

// Fix the header to also use text instead of skeleton bars
const headerRegex = /\{\/\* App Header \(Static\) \*\/\}[\s\S]*?\{\/\* App Body - Animated Feed \*\/\}/s;
const newHeader = `{/* App Header (Static) */}
               <div className="bg-blue-600 p-5 pt-10 pb-4 text-white relative z-20 shadow-md">
                  <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                         M
                       </div>
                       <div>
                         <p className="text-[10px] text-blue-200 leading-tight">Welcome back,</p>
                         <p className="font-bold text-sm leading-tight">Mandar User</p>
                       </div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
                       <span className="text-white text-sm">??</span>
                       <div className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-blue-600"></div>
                     </div>
                  </div>
                  <div className="w-full h-10 bg-white/10 rounded-xl mb-1 flex items-center px-3 border border-white/20">
                    <Search className="w-4 h-4 text-white/70 mr-2" />
                    <span className="text-white/60 text-xs">Search buyers, suppliers...</span>
                  </div>
               </div>
               
               {/* App Body - Animated Feed */}`;
content = content.replace(headerRegex, newHeader);

// Fix category pills
const catRegex = /\{\/\* Category Pills \(Static\) \*\/\}[\s\S]*?\{\/\* Animated Cards Container \*\/\}/s;
const newCat = `{/* Category Pills (Static) */}
                  <div className="flex gap-2 px-1">
                     <div className="w-[4.5rem] h-16 bg-white border border-slate-100 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
                       <Sprout className="w-6 h-6 text-emerald-500 mb-1" />
                       <span className="text-[9px] font-bold text-slate-600">Agriculture</span>
                     </div>
                     <div className="w-[4.5rem] h-16 bg-white border border-slate-100 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
                       <Factory className="w-6 h-6 text-slate-500 mb-1" />
                       <span className="text-[9px] font-bold text-slate-600">Industrial</span>
                     </div>
                     <div className="w-[4.5rem] h-16 bg-white border border-slate-100 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
                       <Package className="w-6 h-6 text-orange-500 mb-1" />
                       <span className="text-[9px] font-bold text-slate-600">Packaging</span>
                     </div>
                  </div>

                  {/* Animated Cards Container */}`;
content = content.replace(catRegex, newCat);


fs.writeFileSync(landingFile, content, 'utf8');
console.log('DONE REPLACING!');
