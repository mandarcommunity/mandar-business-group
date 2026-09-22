"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Building2, BadgeCheck, Filter, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../../components/BackButton';

export default function DirectoryClient({ initialBusinesses, industries }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const filteredBusinesses = initialBusinesses.filter(biz => {
    const matchesSearch = (biz.business_name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (biz.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (biz.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || (biz.industries ? biz.industries[0] : "General") === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="absolute top-6 left-6 z-20">
          <BackButton />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Business Directory</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Discover and connect with trusted businesses in the Mandar Community Ecosystem.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search by name, description, or city..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative min-w-[240px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
            <select 
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium appearance-none cursor-pointer"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="All">All Industries</option>
              {industries.map(ind => (
                <option key={ind.id} value={ind.name}>{ind.emoji} {ind.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="mb-6 flex justify-between items-center text-sm font-medium text-slate-500">
          <span>Showing {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'}</span>
          {selectedIndustry !== 'All' && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{selectedIndustry}</span>}
        </div>

        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredBusinesses.map((biz) => {
                const indObj = industries.find(i => i.name === (biz.industries ? biz.industries[0] : "General"));
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={biz.id}
                    className="h-full"
                  >
                    <Link href={`/biz/${biz.slug || biz.id}`} className="group block bg-white rounded-[2rem] p-5 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 shadow-sm relative">
                          {biz.profile_image && biz.profile_image.startsWith("http") ? (
                            <img src={biz.profile_image} alt={biz.business_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-300">
                              <Building2 className="w-8 h-8" />
                            </div>
                          )}
                          
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <h3 className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors" title={biz.business_name}>{biz.business_name}</h3>
                            {biz.verified ? (
                              <span className="shrink-0 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 w-max"><BadgeCheck className="w-3 h-3"/> Verified Seller</span>
                            ) : (
                              <span className="shrink-0 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold w-max border border-slate-200">Unverified Seller</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
                            {indObj?.emoji || '??'} {(biz.industries ? biz.industries[0] : "General") || "General"}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">
                        {biz.description || "No description provided."}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 truncate max-w-[70%]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{biz.city || "Unknown"}, {biz.state || "IN"}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No businesses found</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              We couldn't find any businesses matching your search criteria. Try adjusting your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedIndustry('All'); }}
              className="bg-blue-50 text-blue-600 px-6 py-2.5 rounded-full font-bold hover:bg-blue-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
