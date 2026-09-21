import { supabase } from '../lib/supabase';
import { ArrowRight, Search, ShieldCheck, TrendingUp, Handshake, Building2, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, business_name, slug, profile_image, city, state, verified')
    .order('created_at', { ascending: false })
    .limit(8);

  return (
    <div className="flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION - STARTUP VIBE */}
      <section className="relative bg-[#0A192F] text-white pt-24 pb-32 px-6 lg:px-12 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-accent/20 blur-[100px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            India's Fastest Growing Community B2B Network
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">Businesses.</span><br/>
            Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">Opportunities.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light">
            Discover verified manufacturers, bulk suppliers, and premium service providers within the trusted Mandar Community Ecosystem.
          </p>
          
          {/* Mock Search Bar */}
          <div className="w-full max-w-2xl bg-white p-2 rounded-full flex items-center shadow-2xl shadow-blue-900/20 mb-12 transform hover:scale-[1.02] transition-transform duration-300">
            <Search className="w-6 h-6 text-gray-400 ml-4 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search for products, businesses, or leads..." 
              className="flex-grow bg-transparent border-none outline-none px-4 text-gray-800 placeholder-gray-400 text-lg w-full"
              readOnly
            />
            <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="bg-secondary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-md whitespace-nowrap hidden sm:block">
              Search Now
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-300">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">10K+</span>
              <span className="text-sm uppercase tracking-wider opacity-80 mt-1">Products</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">5K+</span>
              <span className="text-sm uppercase tracking-wider opacity-80 mt-1">Businesses</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">100%</span>
              <span className="text-sm uppercase tracking-wider opacity-80 mt-1">Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED DIRECTORY - THE CORE PRODUCT */}
      <section id="explore" className="py-24 px-6 bg-gray-50 relative -mt-10 rounded-t-[3rem] z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Top Rated Businesses</h2>
              <p className="text-gray-500 text-lg">Explore premium suppliers and manufacturers highly rated by the community.</p>
            </div>
            <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="text-secondary font-bold hover:text-blue-700 flex items-center gap-2 group">
              View Full Directory <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {businesses?.map((biz, idx) => (
              <Link href={`/biz/${biz.slug || biz.id}`} key={biz.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  {biz.profile_image && biz.profile_image.startsWith("http") ? (
                    <img src={biz.profile_image} alt={biz.business_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-white/20" />
                    </div>
                  )}
                  {biz.verified && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-3 py-1 rounded-full flex items-center gap-1.5 z-10">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-bold text-gray-800">Verified</span>
                    </div>
                  )}
                </div>
                <div className="p-6 relative">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center absolute -top-7 left-6 border border-gray-50 overflow-hidden">
                    {biz.profile_image && biz.profile_image.startsWith("http") ? (
                      <img src={biz.profile_image} alt="logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-black text-primary">{biz.business_name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-1 group-hover:text-secondary transition-colors line-clamp-1">{biz.business_name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {biz.city}{biz.state ? `, ${biz.state}` : ''}
                  </p>
                  <div className="w-full py-3 bg-gray-50 text-center rounded-xl text-sm font-semibold text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    View Profile
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION - STARTUP STYLE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Why the Community Trusts Us</h2>
            <p className="text-gray-500 text-lg">We are building an ecosystem where businesses thrive through trust, transparency, and direct connections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-blue-600 transform -rotate-3 hover:rotate-0 transition-transform">
                <Handshake className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Direct B2B Dealing</h3>
              <p className="text-gray-600 leading-relaxed">No middlemen, no hidden commissions. Connect directly with buyers and sellers through one-tap WhatsApp and Call features.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-green-50/50 hover:bg-green-50 transition-colors">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-accent transform rotate-3 hover:rotate-0 transition-transform">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Network</h3>
              <p className="text-gray-600 leading-relaxed">Every business is thoroughly vetted. Deal with confidence knowing you are interacting with genuine community members.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-purple-50/50 hover:bg-purple-50 transition-colors">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-purple-600 transform -rotate-3 hover:rotate-0 transition-transform">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Live Leads</h3>
              <p className="text-gray-600 leading-relaxed">Access real-time business requirements and tenders posted by the community. Grow your sales pipeline instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APP DOWNLOAD CTA */}
      <section className="py-20 px-6 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-5xl mx-auto relative z-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="md:w-3/5 text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to scale your business?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Join thousands of community members already buying, selling, and growing on our mobile app.
            </p>
            <a href="https://play.google.com/store/apps/details?id=com.mandar.community" className="inline-flex items-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              <Smartphone className="w-6 h-6" /> Get the App Now
            </a>
          </div>
          <div className="md:w-2/5 flex justify-center">
            {/* Visual representation of the app */}
            <div className="w-64 h-80 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-6 flex flex-col gap-4 transform rotate-6">
               <div className="w-full h-8 bg-white/20 rounded-full animate-pulse"></div>
               <div className="w-3/4 h-8 bg-white/20 rounded-full animate-pulse delay-75"></div>
               <div className="w-full h-32 bg-white/10 rounded-2xl mt-4 border border-white/10"></div>
               <div className="w-full h-12 bg-accent/80 rounded-xl mt-auto flex items-center justify-center text-sm font-bold shadow-lg">View Platform</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
