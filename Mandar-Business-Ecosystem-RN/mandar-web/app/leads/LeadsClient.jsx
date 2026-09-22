"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Factory, Calendar, Briefcase, ArrowRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../../components/BackButton';

export default function LeadsClient({ leads }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter(lead => {
    return (lead.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
           (lead.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (lead.city || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans selection:bg-blue-200">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-6 left-6 z-20">
          <BackButton />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Live B2B Leads</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover new requirements and business opportunities. Connect securely via the Mandar Community App.
          </p>

          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col md:flex-row gap-2 relative z-20">
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-transparent focus-within:bg-white focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100 transition-all">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search leads, materials, city..." 
                className="w-full bg-transparent border-none py-3.5 px-3 focus:outline-none text-slate-700 font-medium placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* LEADS LISTING SECTION */}
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-6 flex justify-between items-end">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredLeads.length} live requirements
          </p>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-16 text-center border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-orange-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No leads found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              We couldn't find any requirements matching your search criteria. Try adjusting your search.
            </p>
            <button onClick={() => setSearchQuery('')} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-full transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <AnimatePresence>
              {filteredLeads.map((lead) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={lead.id}
                >
                  <Link href={`/req/${lead.slug || lead.id}`} className="group block bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300">
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                             <Briefcase className="w-3 h-3" /> Requirement
                           </span>
                           <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                             <Calendar className="w-3.5 h-3.5" /> {new Date(lead.created_at).toLocaleDateString()}
                           </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                          {lead.title}
                        </h3>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Lock className="w-3.5 h-3.5" /> Anti-Spam Protected
                      </div>
                    </div>

                    <p className="text-slate-600 line-clamp-2 mb-6 leading-relaxed">
                      {lead.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                      <div className="flex flex-wrap gap-2">
                        {(lead.city || lead.state) && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {lead.city}{lead.state ? `, ${lead.state}` : ''}
                          </span>
                        )}
                        {lead.industries && lead.industries.length > 0 && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                            <Factory className="w-3 h-3 text-slate-400" />
                            {lead.industries[0]}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-orange-500 group-hover:text-orange-600 flex items-center gap-1.5">
                        View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
