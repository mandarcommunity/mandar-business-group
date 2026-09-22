"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function IndustriesClient({ initialIndustries }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndustries = initialIndustries.filter(industry => 
    industry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">All Industries</h1>
          <p className="text-xl text-slate-500 max-w-2xl mb-8">
            Browse the complete list of business sectors present in the Mandar Community.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
              placeholder="Search industries (e.g. Agriculture, Real Estate...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {filteredIndustries.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredIndustries.map((ind, i) => {
              const colors = [
                "bg-blue-50 text-blue-700 hover:bg-blue-100",
                "bg-purple-50 text-purple-700 hover:bg-purple-100",
                "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
                "bg-orange-50 text-orange-700 hover:bg-orange-100",
                "bg-pink-50 text-pink-700 hover:bg-pink-100",
              ];
              const colorClass = colors[i % colors.length];

              return (
                <Link href={`/industry/${ind.slug}`} key={ind.id}>
                  <div className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all ${colorClass}`}>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <span className="text-xl">{ind.emoji}</span>
                    </div>
                    <span className="font-semibold text-sm leading-tight">{ind.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
            <div className="text-6xl mb-4">??</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No industries found</h3>
            <p className="text-slate-500">We couldn't find any industry matching "{searchQuery}".</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-full hover:bg-blue-100 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
