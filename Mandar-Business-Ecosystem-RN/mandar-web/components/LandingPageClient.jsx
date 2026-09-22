"use client";


import { INDUSTRIES } from "../constants/industries";
import { slugify, getIndustryEmoji } from "../lib/utils";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShieldCheck, TrendingUp, Building2, Smartphone, ArrowRight, Package, MapPin, CheckCircle2, Factory, Briefcase, Zap, Sprout } from 'lucide-react';
import Link from 'next/link';

export default function LandingPageClient({ businesses }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Categories for a JustDial-like feel
  

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen font-sans selection:bg-blue-200 overflow-hidden">
      
      {/* 1. PREMIUM LIGHT HERO (Stripe/Vercel inspired, but B2B focused) */}
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

          {/* Right Mobile App Mockup (Friend's Concept - Enriched) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center relative hidden md:flex perspective-1000 mt-12 lg:mt-0"
          >
            <style>{`
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
            `}</style>

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
                      Buyers � Sellers � Grow Together
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
                  <span className="text-lg">�</span>
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

      {/* 2. DYNAMIC INDUSTRIES CAROUSEL */}
      <section className="py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Explore by Industry</h2>
            <p className="text-slate-500">Discover verified businesses across {INDUSTRIES.length}+ sectors.</p>
          </div>
          <Link href="/industries" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 bg-blue-50 px-5 py-2.5 rounded-full transition-colors">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto pb-8 pt-4 px-6 gap-6 snap-x snap-mandatory hide-scrollbar max-w-7xl mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {INDUSTRIES.slice(0, 15).map((industry, i) => {
            const colors = [
              "bg-blue-100 text-blue-600",
              "bg-purple-100 text-purple-600",
              "bg-emerald-100 text-emerald-600",
              "bg-orange-100 text-orange-600",
              "bg-pink-100 text-pink-600",
              "bg-indigo-100 text-indigo-600",
              "bg-yellow-100 text-yellow-600",
            ];
            const colorClass = colors[i % colors.length];
            
            return (
              <Link href={`/industry/${slugify(industry)}`} key={i}>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="snap-start shrink-0 flex flex-col items-center gap-3 cursor-pointer group w-32"
                >
                  <div className={`w-20 h-20 rounded-2xl ${colorClass} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                    <span className="text-3xl">{getIndustryEmoji(industry)}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 text-center leading-tight line-clamp-2">{industry}</span>
                </motion.div>
              </Link>
            );
          })}
          
          <Link href="/industries">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="snap-start shrink-0 w-64 h-32 rounded-3xl bg-slate-900 text-white flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all gap-3"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold">Explore All {INDUSTRIES.length}</span>
            </motion.div>
          </Link>
        </div>
        
        {/* Mobile See All */}
        <div className="px-6 mt-4 flex justify-center md:hidden">
          <Link href="/industries" className="flex w-full justify-center items-center gap-2 text-blue-600 font-bold bg-blue-50 px-6 py-3 rounded-xl transition-colors">
            See All Industries <ArrowRight className="w-4 h-4" />
          </Link>
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
