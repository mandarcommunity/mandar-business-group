"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, ShieldCheck, Zap, Briefcase, ChevronRight, Globe, Layers, Download } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export default function LandingPageClient({ businesses }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Client side only for marquee to avoid hydration mismatch on animation
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* 1. ULTRA MODERN HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-600/20 blur-[100px] absolute"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-purple-600/20 blur-[100px] absolute translate-x-1/3 translate-y-1/4"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Mandar Ecosystem 2.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05]"
          >
            Commerce, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              reimagined.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light tracking-wide mb-10"
          >
            The sleekest way to discover verified manufacturers, generate B2B leads, and scale your enterprise within a trusted community.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
          >
            <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="group relative px-6 py-3 rounded-full bg-white text-black font-semibold text-sm tracking-wide overflow-hidden flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10">Get the App</span>
              <Download className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a href="#directory" className="px-6 py-3 rounded-full bg-white/5 text-white font-semibold text-sm tracking-wide border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2">
              Explore Directory <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Dashboard Mockup Peek */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="relative z-10 w-full max-w-4xl mt-20 rounded-t-3xl border-t border-x border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl h-64 overflow-hidden shadow-[0_-20px_50px_rgba(59,130,246,0.1)] p-4 flex gap-4"
        >
          {/* Fake UI Elements for aesthetics */}
          <div className="w-1/4 h-full flex flex-col gap-3">
            <div className="w-full h-8 bg-white/5 rounded-lg"></div>
            <div className="w-3/4 h-4 bg-white/5 rounded-full mt-4"></div>
            <div className="w-1/2 h-4 bg-white/5 rounded-full"></div>
            <div className="w-full h-24 bg-white/5 rounded-xl mt-auto"></div>
          </div>
          <div className="w-3/4 h-full flex flex-col gap-4">
            <div className="w-full flex gap-4 h-24">
              <div className="flex-1 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-white/5 flex items-center p-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex-shrink-0"></div>
                <div className="ml-3 flex-1">
                   <div className="w-1/2 h-3 bg-white/10 rounded-full mb-2"></div>
                   <div className="w-1/4 h-2 bg-white/5 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl border border-white/5"></div>
            </div>
            <div className="w-full flex-1 bg-white/5 rounded-xl border border-white/5"></div>
          </div>
        </motion.div>
      </section>

      {/* 2. INFINITE MARQUEE (Sleek) */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden flex items-center">
        {mounted && (
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="flex whitespace-nowrap gap-12 px-6"
          >
            {[...businesses, ...businesses, ...businesses].map((biz, i) => (
              <div key={i} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-default">
                {biz.profile_image && biz.profile_image.startsWith("http") ? (
                  <img src={biz.profile_image} className="w-8 h-8 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all" alt="" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{biz.business_name.charAt(0)}</div>
                )}
                <span className="text-sm font-medium tracking-wide">{biz.business_name}</span>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 3. BENTO BOX FEATURES */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Everything you need. <br/><span className="text-gray-500">Nothing you don't.</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {/* Large Card */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-2 bg-[#0d0d0d] rounded-3xl p-8 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/4 group-hover:bg-blue-500/20 transition-colors duration-700"></div>
            <ShieldCheck className="w-10 h-10 text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Verified Trust Network</h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Every business undergoes strict verification. We ensure that you only deal with legitimate, high-quality manufacturers and buyers within the community.
            </p>
            {/* Minimal Mock */}
            <div className="absolute bottom-0 right-10 w-64 h-40 bg-[#151515] rounded-t-2xl border-t border-x border-white/10 shadow-2xl p-4 flex flex-col gap-3 translate-y-8 group-hover:translate-y-4 transition-transform duration-500">
               <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-green-500" /></div>
                  <div className="w-24 h-2 bg-white/20 rounded-full"></div>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full mt-2"></div>
               <div className="w-3/4 h-2 bg-white/5 rounded-full"></div>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="bg-[#0d0d0d] rounded-3xl p-8 border border-white/5 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-lg font-bold mb-1 tracking-tight">Live Leads</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Instant notifications for new tenders and requirements.</p>
            </div>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="bg-[#0d0d0d] rounded-3xl p-8 border border-white/5 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Briefcase className="w-8 h-8 text-orange-400" />
            <div>
              <h3 className="text-lg font-bold mb-1 tracking-tight">Direct Dealing</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Zero commission. Connect directly via WhatsApp or Call.</p>
            </div>
          </motion.div>

          {/* Wide Card */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 bg-[#0d0d0d] rounded-3xl p-8 border border-white/5 flex items-center justify-between group relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="max-w-xs relative z-10">
              <Globe className="w-8 h-8 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold mb-2 tracking-tight">Global Reach</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Expand your community business beyond local borders with digital catalogs.</p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-32 h-32 rounded-full border border-white/5 relative z-10">
               <Layers className="w-10 h-10 text-white/20 group-hover:text-white/80 transition-colors duration-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SLEEK DIRECTORY GRID */}
      <section id="directory" className="py-24 px-6 border-t border-white/5 bg-[#030303]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">Explore Enterprises</h2>
              <p className="text-gray-500 text-sm">Discover verified businesses leading the community.</p>
            </div>
            <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest">
              View All <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {businesses?.map((biz, idx) => (
              <motion.div 
                key={biz.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link href={`/biz/${biz.slug || biz.id}`} className="group block bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 hover:bg-[#111] transition-all duration-300">
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                        {biz.profile_image && biz.profile_image.startsWith("http") ? (
                          <img src={biz.profile_image} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-400">
                            {biz.business_name.charAt(0)}
                          </div>
                        )}
                      </div>
                      {biz.verified && <ShieldCheck className="w-4 h-4 text-blue-500 opacity-80" />}
                    </div>
                    <h3 className="font-semibold text-gray-200 text-base tracking-tight line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">{biz.business_name}</h3>
                    <p className="text-xs text-gray-500 mb-6">{biz.city}{biz.state ? `, ${biz.state}` : ''}</p>
                    
                    <div className="mt-auto flex items-center gap-2 text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                      View Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MINIMAL CTA */}
      <section className="py-32 px-6 flex flex-col items-center justify-center text-center border-t border-white/5">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Ready to scale?</h2>
        <p className="text-gray-400 text-sm max-w-md mb-10">Join thousands of verified businesses actively trading on the Mandar Community App.</p>
        <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide flex items-center gap-2 hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]">
          Download App
        </a>
      </section>
    </div>
  );
}
