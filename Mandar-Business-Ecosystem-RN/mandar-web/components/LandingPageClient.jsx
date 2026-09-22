"use client";


import <span className="text-3xl">{getIndustryEmoji(industry)}</span>)()}
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
