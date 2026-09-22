const fs = require('fs');
const landingFile = 'components/LandingPageClient.jsx';
let landingContent = fs.readFileSync(landingFile, 'utf8');

const heroRegex = /\{\/\* 1\. PREMIUM LIGHT HERO[\s\S]*?\{\/\* 2\. DYNAMIC INDUSTRIES CAROUSEL \*\/\}/;

const newHero = `{/* 1. PREMIUM LIGHT HERO (Stripe/Vercel inspired, but B2B focused) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-20 bg-white overflow-hidden border-b border-slate-200">
        
        {/* Subtle animated background grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Soft glowing ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left px-2 sm:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 sm:mb-8 max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0"></span>
              <span className="text-xs sm:text-sm font-semibold text-blue-700 tracking-wide truncate">Mandar Community App is Live</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-[1.15]"
            >
              The Smart Way to <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Grow Business.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-slate-600 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8 sm:mb-10"
            >
              Connect directly with verified manufacturers, suppliers, and buyers. Zero commission. 100% transparency.
            </motion.p>

            {/* Premium Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="w-full max-w-md bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_8px_40px_rgb(59,130,246,0.15)] transition-shadow duration-300"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 ml-2 sm:ml-4 shrink-0" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full min-w-0 flex-grow bg-transparent border-none outline-none px-3 sm:px-4 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                readOnly
              />
              <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-colors shadow-sm shrink-0">
                Search
              </a>
            </motion.div>
          </div>

          {/* Right Mobile App Mockup with B2B Animations */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center relative hidden md:flex perspective-1000 mt-12 lg:mt-0"
          >
            {/* FLOATING B2B ELEMENTS */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              className="absolute top-12 -left-12 z-20 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[bounce_4s_infinite]"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">New Requirement</p>
                <p className="text-sm font-bold text-slate-900">Need 1000kg Wheat</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
              className="absolute bottom-32 -right-16 z-20 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-[bounce_5s_infinite_0.5s]"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Manufacturer</p>
                <p className="text-sm font-bold text-slate-900">Verified Profile</p>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: y2 }} 
              className="relative z-10 w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden flex flex-col transform rotate-y-[-10deg] rotate-x-[5deg]"
            >
               {/* App Header */}
               <div className="bg-blue-600 p-6 pt-12 pb-4 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                  <div className="flex justify-between items-center mb-4 relative z-10">
                     <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                         <span className="text-white text-xs">??</span>
                       </div>
                       <div className="w-20 h-4 bg-white/20 rounded-full"></div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                       <span className="text-white text-xs">??</span>
                     </div>
                  </div>
                  <div className="w-full h-10 bg-white/20 rounded-xl mb-2 flex items-center px-3 relative z-10">
                    <Search className="w-4 h-4 text-white/70 mr-2" />
                    <div className="w-24 h-2.5 bg-white/30 rounded-full"></div>
                  </div>
               </div>
               
               {/* App Body - Feed */}
               <div className="flex-1 bg-slate-50 p-4 flex flex-col gap-4 overflow-y-hidden">
                  
                  {/* Category Pills */}
                  <div className="flex gap-2">
                     <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center shadow-sm">
                       <span className="text-xl mb-1">??</span>
                       <div className="w-8 h-1.5 bg-slate-200 rounded-full"></div>
                     </div>
                     <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center shadow-sm">
                       <span className="text-xl mb-1">??</span>
                       <div className="w-8 h-1.5 bg-slate-200 rounded-full"></div>
                     </div>
                     <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center shadow-sm">
                       <span className="text-xl mb-1">??</span>
                       <div className="w-8 h-1.5 bg-slate-200 rounded-full"></div>
                     </div>
                     <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center shadow-sm">
                       <span className="text-xl mb-1">??</span>
                       <div className="w-8 h-1.5 bg-slate-200 rounded-full"></div>
                     </div>
                  </div>

                  {/* Business Card 1 */}
                  <div className="w-full bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-slate-100 p-4">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">J</div>
                       <div>
                         <div className="w-24 h-3 bg-slate-800 rounded-full mb-1.5"></div>
                         <div className="w-16 h-2 bg-slate-400 rounded-full"></div>
                       </div>
                       <div className="ml-auto w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                         <CheckCircle2 className="w-3 h-3 text-green-600" />
                       </div>
                     </div>
                     <div className="w-full h-24 bg-slate-100 rounded-xl mb-3 flex items-center justify-center text-slate-300">
                       <Package className="w-8 h-8" />
                     </div>
                     <div className="w-full h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                       <div className="w-16 h-2 bg-blue-600 rounded-full"></div>
                     </div>
                  </div>

                  {/* Business Card 2 */}
                  <div className="w-full bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-slate-100 p-4 relative top-2">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg">M</div>
                       <div>
                         <div className="w-20 h-3 bg-slate-800 rounded-full mb-1.5"></div>
                         <div className="w-12 h-2 bg-slate-400 rounded-full"></div>
                       </div>
                     </div>
                  </div>
               </div>
               
               {/* Bottom Nav */}
               <div className="w-full h-16 bg-white border-t border-slate-100 flex items-center justify-around px-4">
                 <div className="w-6 h-6 rounded-md bg-blue-600"></div>
                 <div className="w-6 h-6 rounded-md bg-slate-200"></div>
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center -mt-6 border-4 border-white shadow-sm">
                   <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                 </div>
                 <div className="w-6 h-6 rounded-md bg-slate-200"></div>
                 <div className="w-6 h-6 rounded-md bg-slate-200"></div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. DYNAMIC INDUSTRIES CAROUSEL */}`;

landingContent = landingContent.replace(heroRegex, newHero);
fs.writeFileSync(landingFile, landingContent, 'utf8');
