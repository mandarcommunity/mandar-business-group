"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShieldCheck, TrendingUp, Building2, Smartphone, ArrowRight, Package, MapPin, CheckCircle2, Factory, Briefcase, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPageClient({ businesses }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Categories for a JustDial-like feel
  const categories = [
    { name: "Manufacturing", icon: Factory, color: "bg-blue-100 text-blue-600" },
    { name: "Retail", icon: Building2, color: "bg-purple-100 text-purple-600" },
    { name: "Wholesale", icon: Package, color: "bg-orange-100 text-orange-600" },
    { name: "Services", icon: Briefcase, color: "bg-green-100 text-green-600" },
    { name: "Electronics", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
    { name: "Textiles", icon: Search, color: "bg-pink-100 text-pink-600" },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen font-sans selection:bg-blue-200 overflow-hidden">
      
      {/* 1. PREMIUM LIGHT HERO (Stripe/Vercel inspired, but B2B focused) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-28 pb-20 bg-white overflow-hidden border-b border-slate-200">
        
        {/* Subtle animated background grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Soft glowing ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700 tracking-wide">Mandar Community App is Live</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              The Smart Way to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Grow Business.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-slate-600 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            >
              Connect directly with verified manufacturers, suppliers, and buyers. Zero commission. 100% transparency.
            </motion.p>

            {/* Premium Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="w-full max-w-md bg-white p-2 rounded-2xl flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_8px_40px_rgb(59,130,246,0.15)] transition-shadow duration-300"
            >
              <Search className="w-6 h-6 text-slate-400 ml-4 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search businesses, products..." 
                className="flex-grow bg-transparent border-none outline-none px-4 text-slate-800 placeholder-slate-400 text-base"
                readOnly
              />
              <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm whitespace-nowrap">
                Search
              </a>
            </motion.div>
          </div>

          {/* Right Mobile App Mockup (CSS only, animated) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="lg:w-1/2 flex justify-center relative hidden md:flex perspective-1000"
          >
            <motion.div style={{ y: y2 }} className="relative z-10 w-[300px] h-[600px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden flex flex-col transform rotate-y-[-10deg] rotate-x-[5deg]">
               {/* App Header */}
               <div className="bg-blue-600 p-6 pt-12 pb-4 text-white">
                  <div className="flex justify-between items-center mb-4">
                     <div className="w-8 h-8 rounded-full bg-white/20"></div>
                     <div className="w-24 h-4 bg-white/20 rounded-full"></div>
                     <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  </div>
                  <div className="w-full h-10 bg-white/20 rounded-xl mb-2"></div>
               </div>
               {/* App Body */}
               <div className="flex-1 bg-slate-50 p-4 flex flex-col gap-4 overflow-hidden">
                  <div className="flex gap-2">
                     <div className="w-16 h-16 bg-blue-100 rounded-2xl flex-shrink-0"></div>
                     <div className="w-16 h-16 bg-purple-100 rounded-2xl flex-shrink-0"></div>
                     <div className="w-16 h-16 bg-green-100 rounded-2xl flex-shrink-0"></div>
                     <div className="w-16 h-16 bg-orange-100 rounded-2xl flex-shrink-0"></div>
                  </div>
                  <div className="w-full h-32 bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                     <div className="w-10 h-10 bg-slate-200 rounded-full mb-3"></div>
                     <div className="w-3/4 h-3 bg-slate-200 rounded-full mb-2"></div>
                     <div className="w-1/2 h-2 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="w-full h-32 bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                     <div className="w-10 h-10 bg-slate-200 rounded-full mb-3"></div>
                     <div className="w-3/4 h-3 bg-slate-200 rounded-full mb-2"></div>
                     <div className="w-1/2 h-2 bg-slate-100 rounded-full"></div>
                  </div>
               </div>
            </motion.div>
            
            {/* Floating Elements behind phone */}
            <motion.div style={{ y: y1 }} className="absolute -right-4 top-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-green-600" /></div>
              <div>
                <div className="text-sm font-bold text-slate-900">Verified Seller</div>
                <div className="text-xs text-slate-500">Joined today</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 2. CATEGORIES (JustDial style but modern) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Explore by Industry</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED DIRECTORY - Premium Grid */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Top Rated Businesses</h2>
              <p className="text-slate-500 text-lg">Connect with highly trusted community enterprises.</p>
            </div>
            <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 hover:shadow-md transition-all">
              View Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businesses?.map((biz, idx) => (
              <motion.div 
                key={biz.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link href={`/biz/${biz.slug || biz.id}`} className="group block bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                      {biz.profile_image && biz.profile_image.startsWith("http") ? (
                        <img src={biz.profile_image} alt={biz.business_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl font-bold text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200">
                          {biz.business_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {biz.verified && (
                      <div className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{biz.business_name}</h3>
                  
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-6">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {biz.city}{biz.state ? `, ${biz.state}` : ''}
                  </p>
                  
                  <div className="mt-auto w-full py-2.5 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-700 text-center rounded-xl text-sm font-bold transition-colors">
                    View Profile
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM BENTO FEATURES */}
      <section className="py-24 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything you need to grow.</h2>
            <p className="text-slate-500 text-lg">A complete ecosystem designed to help community businesses thrive online.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            {/* Big Feature */}
            <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-100 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors duration-500"></div>
              <ShieldCheck className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Verified Trust Network</h3>
              <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                Every business undergoes strict verification. Deal with legitimate, high-quality manufacturers and buyers.
              </p>
            </motion.div>
            
            {/* Small Feature 1 */}
            <motion.div whileHover={{ scale: 0.98 }} className="bg-orange-50 rounded-3xl p-8 border border-orange-100 flex flex-col justify-center">
              <TrendingUp className="w-10 h-10 text-orange-600 mb-5" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Live Leads</h3>
              <p className="text-slate-600">Instant notifications for new tenders and requirements.</p>
            </motion.div>

            {/* Small Feature 2 */}
            <motion.div whileHover={{ scale: 0.98 }} className="bg-purple-50 rounded-3xl p-8 border border-purple-100 flex flex-col justify-center">
              <Building2 className="w-10 h-10 text-purple-600 mb-5" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Digital Catalog</h3>
              <p className="text-slate-600">Showcase your products beautifully to the world.</p>
            </motion.div>

            {/* Wide Feature */}
            <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 bg-slate-50 rounded-3xl p-10 border border-slate-200 flex flex-col justify-center">
              <Smartphone className="w-12 h-12 text-slate-900 mb-6" />
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Mobile First</h3>
              <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                Manage your business, chat with clients, and fulfill leads on the go with our dedicated Android app.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. APP CTA */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl rotate-12 mb-8 shadow-2xl flex items-center justify-center">
             <Smartphone className="w-10 h-10 text-white -rotate-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Ready to scale your business?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl">
            Join thousands of community members already buying, selling, and growing on the Mandar Community App.
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="bg-white text-slate-900 px-10 py-4 rounded-full font-extrabold text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-3">
            Download the App Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
