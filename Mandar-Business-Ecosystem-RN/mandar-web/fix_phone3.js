const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(landingFile, 'utf8');

const regex = /\{\/\* Right Mobile App Mockup[\s\S]*?(?=\{\/\* 2\. DYNAMIC INDUSTRIES CAROUSEL \*\/\})/s;

const newMockup = `{/* Right Mobile App Mockup (Friend's Concept - Enriched) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center relative hidden md:flex perspective-1000 mt-12 lg:mt-0"
          >
            <style>{\`
              @keyframes phoneFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              @keyframes promoMove {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
              }
              @keyframes handshakeShake {
                0%, 100% { transform: rotate(0) scale(1); }
                50% { transform: rotate(-8deg) scale(1.08); }
              }
              @keyframes enquiryPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(37, 99, 235, 0); }
                50% { transform: scale(1.02); box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2); }
              }
              @keyframes searchGlow {
                0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                50% { box-shadow: 0 6px 20px rgba(37,99,235,0.15); }
              }
              @keyframes categorySlide {
                0%, 20% { transform: translateX(0); }
                40%, 60% { transform: translateX(-40px); }
                80%, 100% { transform: translateX(0); }
              }
              @keyframes productSlide {
                0%, 25% { transform: translateX(0); }
                45%, 70% { transform: translateX(-120px); }
                90%, 100% { transform: translateX(0); }
              }
            \`}</style>

            <motion.div 
              style={{ y: y2 }} 
              className="relative z-10 w-[300px] h-[600px] bg-[#f8fafc] rounded-[2.5rem] border-[10px] border-[#101828] overflow-hidden flex flex-col transform rotate-y-[-10deg] rotate-x-[5deg] animate-[phoneFloat_4s_ease-in-out_infinite]"
              style={{ boxShadow: '0 30px 70px rgba(0,0,0,0.22), 0 10px 25px rgba(0,0,0,0.12)' }}
            >
              {/* STATUS BAR */}
              <div className="h-7 px-5 pt-2 flex justify-between items-center text-[10px] font-bold text-slate-800 bg-white z-50">
                <span>9:41</span>
                <div className="flex gap-1 text-[8px] items-center">
                  <span>?</span><span>?</span><span>?</span>
                </div>
              </div>

              {/* APP HEADER */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 pt-3 pb-6 text-white rounded-b-3xl shadow-md z-40 relative">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <div className="text-xl font-extrabold tracking-tight flex items-center gap-1">
                      Mandar <span className="text-yellow-400">Hub</span>
                    </div>
                    <div className="text-[8px] text-blue-100 opacity-90 font-medium tracking-wide">
                      Buyers • Sellers • Grow Together
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm">?</span>
                  </div>
                </div>
              </div>

              {/* SEARCH */}
              <div className="mx-4 -mt-4 bg-white h-10 rounded-xl px-3 flex items-center gap-2 text-slate-400 text-xs z-50 relative animate-[searchGlow_3s_infinite]">
                <span className="text-sm">??</span>
                <span className="font-medium">Search products, suppliers...</span>
              </div>

              {/* SCROLLABLE BODY */}
              <div className="flex-1 overflow-hidden relative mt-4 flex flex-col gap-5">
                
                {/* CATEGORIES */}
                <div>
                  <div className="px-4 animate-[categorySlide_8s_ease-in-out_infinite] whitespace-nowrap flex gap-3">
                    
                    <div className="inline-flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-xl mb-1 text-emerald-500 bg-emerald-50/50">
                        ??
                      </div>
                      <span className="text-[9px] font-bold text-slate-600">Vegetables</span>
                    </div>

                    <div className="inline-flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-xl mb-1 text-amber-500 bg-amber-50/50">
                        ??
                      </div>
                      <span className="text-[9px] font-bold text-slate-600">Grains</span>
                    </div>

                    <div className="inline-flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-xl mb-1 text-blue-500 bg-blue-50/50">
                        ??
                      </div>
                      <span className="text-[9px] font-bold text-slate-600">Grocery</span>
                    </div>

                    <div className="inline-flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-xl mb-1 text-purple-500 bg-purple-50/50">
                        ??
                      </div>
                      <span className="text-[9px] font-bold text-slate-600">Industrial</span>
                    </div>

                    <div className="inline-flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-xl mb-1 text-slate-400">
                        +
                      </div>
                      <span className="text-[9px] font-bold text-slate-600">More</span>
                    </div>

                  </div>
                </div>

                {/* PROMO */}
                <div className="mx-4 bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-[1.2rem] shadow-sm flex justify-between items-center border border-amber-200/60 animate-[promoMove_4s_ease-in-out_infinite]">
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 mb-1 flex items-center gap-1">
                      <span className="text-green-600">?</span> Verified Suppliers
                    </div>
                    <p className="text-[9px] text-slate-600 w-32 leading-tight mb-2">Connect directly with trusted Mandar businesses.</p>
                    <button className="bg-amber-400 text-amber-950 px-3 py-1.5 rounded-full text-[9px] font-extrabold shadow-sm">
                      Explore Now ?
                    </button>
                  </div>
                  <div className="text-4xl animate-[handshakeShake_2s_ease-in-out_infinite] origin-bottom-right">
                    ??
                  </div>
                </div>

                {/* PRODUCTS */}
                <div>
                  <div className="px-4 flex justify-between items-center mb-2">
                    <strong className="text-xs text-slate-900">Featured Products</strong>
                    <span className="text-[9px] text-blue-600 font-bold">View All ?</span>
                  </div>
                  
                  <div className="px-4 animate-[productSlide_7s_ease-in-out_infinite] whitespace-nowrap flex gap-3">
                    
                    {/* Product Card 1 */}
                    <div className="w-[130px] bg-white rounded-[1rem] p-2 shadow-sm border border-slate-100 relative shrink-0 inline-block">
                      <div className="h-20 bg-red-50 rounded-xl flex items-center justify-center text-4xl mb-2">
                        ??
                      </div>
                      <div className="absolute top-20 left-3 bg-white text-green-600 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                        <CheckCircle2 className="w-2 h-2" /> Verified
                      </div>
                      <h4 className="text-[11px] font-extrabold text-slate-900 mt-3 truncate">Fresh Tomatoes</h4>
                      <div className="text-[8px] text-slate-500 mb-1">Vegetables & Fruits</div>
                      <div className="text-[13px] font-bold text-slate-900 mb-2">
                        ?18 <span className="text-[9px] font-normal text-slate-500">/kg</span>
                      </div>
                      <button className="w-full bg-white border border-blue-600 text-blue-600 rounded-lg py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 animate-[enquiryPulse_3s_infinite]">
                        ?? Send Enquiry
                      </button>
                    </div>

                    {/* Product Card 2 */}
                    <div className="w-[130px] bg-white rounded-[1rem] p-2 shadow-sm border border-slate-100 relative shrink-0 inline-block">
                      <div className="h-20 bg-amber-50 rounded-xl flex items-center justify-center text-4xl mb-2">
                        ??
                      </div>
                      <div className="absolute top-20 left-3 bg-white text-green-600 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                        <CheckCircle2 className="w-2 h-2" /> Verified
                      </div>
                      <h4 className="text-[11px] font-extrabold text-slate-900 mt-3 truncate">Premium Wheat</h4>
                      <div className="text-[8px] text-slate-500 mb-1">Grains & Cereals</div>
                      <div className="text-[13px] font-bold text-slate-900 mb-2">
                        ?28 <span className="text-[9px] font-normal text-slate-500">/kg</span>
                      </div>
                      <button className="w-full bg-white border border-blue-600 text-blue-600 rounded-lg py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 animate-[enquiryPulse_3s_infinite]" style={{ animationDelay: '1.5s' }}>
                        ?? Send Enquiry
                      </button>
                    </div>

                    {/* Product Card 3 (for smooth loop) */}
                    <div className="w-[130px] bg-white rounded-[1rem] p-2 shadow-sm border border-slate-100 relative shrink-0 inline-block">
                      <div className="h-20 bg-red-50 rounded-xl flex items-center justify-center text-4xl mb-2">
                        ??
                      </div>
                      <div className="absolute top-20 left-3 bg-white text-green-600 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                        <CheckCircle2 className="w-2 h-2" /> Verified
                      </div>
                      <h4 className="text-[11px] font-extrabold text-slate-900 mt-3 truncate">Fresh Tomatoes</h4>
                      <div className="text-[8px] text-slate-500 mb-1">Vegetables & Fruits</div>
                      <div className="text-[13px] font-bold text-slate-900 mb-2">
                        ?18 <span className="text-[9px] font-normal text-slate-500">/kg</span>
                      </div>
                      <button className="w-full bg-white border border-blue-600 text-blue-600 rounded-lg py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 animate-[enquiryPulse_3s_infinite]">
                        ?? Send Enquiry
                      </button>
                    </div>

                  </div>
                </div>

              </div>
              
              {/* BOTTOM NAV */}
              <div className="h-14 bg-white border-t border-slate-200 flex justify-around items-center px-2 z-50">
                <div className="flex flex-col items-center text-blue-600">
                  <span className="text-lg">¦</span>
                  <span className="text-[7px] font-bold mt-0.5">Home</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <span className="text-lg">??</span>
                  <span className="text-[7px] font-bold mt-0.5">Enquiries</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <span className="text-lg">??</span>
                  <span className="text-[7px] font-bold mt-0.5">My Leads</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <span className="text-lg">??</span>
                  <span className="text-[7px] font-bold mt-0.5">Profile</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      `;

content = content.replace(regex, newMockup);
fs.writeFileSync(landingFile, content, 'utf8');
console.log('DONE REPLACING!');
