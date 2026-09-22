"use client";
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Building2, BadgeCheck, Filter, ArrowRight, Package, Phone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../../components/BackButton';

export default function ProductsClient({ initialProducts, industries }) {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (q) setSearchQuery(q);
  }, [q]);

  const uniqueCities = useMemo(() => {
    const cities = initialProducts
      .map(p => p.business?.city)
      .filter(Boolean)
      .map(c => c.trim())
      .filter(c => c !== '');
    return ['All', ...new Set(cities)].sort();
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (p.name || '').toLowerCase().includes(searchLower) ||
        (p.description || '').toLowerCase().includes(searchLower) ||
        (p.business?.business_name || '').toLowerCase().includes(searchLower);

      const pIndustries = p.business?.industries || [];
      const matchesIndustry = selectedIndustry === 'All' || pIndustries.includes(selectedIndustry);
      
      const matchesCity = selectedCity === 'All' || (p.business?.city || '').trim() === selectedCity;
      
      const matchesVerified = !verifiedOnly || p.business?.verified === true;

      return matchesSearch && matchesIndustry && matchesCity && matchesVerified;
    });
  }, [initialProducts, searchQuery, selectedIndustry, selectedCity, verifiedOnly]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="absolute top-6 left-6 z-20">
          <BackButton />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Global Catalog</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Discover thousands of products from trusted manufacturers and suppliers.
          </p>
          
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input 
                type="text"
                placeholder="Search products, materials, or suppliers..."
                className="w-full bg-transparent border-none outline-none text-slate-700 placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-bold active:scale-95 transition-transform"
            >
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className={`w-full md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" /> Advanced Filters
            </h3>

            {/* Verified Toggle */}
            <label className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors mb-6 border border-blue-100/50">
              <input 
                type="checkbox" 
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-blue-600" /> Verified Sellers Only
              </span>
            </label>

            {/* Industry Filter */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Industry</label>
              <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                <button 
                  onClick={() => setSelectedIndustry('All')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedIndustry === 'All' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Industries
                </button>
                {industries.map(ind => (
                  <button 
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 truncate ${selectedIndustry === ind.name ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <span>{ind.emoji}</span> <span className="truncate">{ind.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">City / Location</label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
              >
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city === 'All' ? 'Any Location' : city}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 text-sm font-medium text-slate-500">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={product.id}
                  >
                    <Link href={`/p/${product.slug || product.id}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full block">
                      
                      {/* Product Image */}
                      <div className="h-48 bg-slate-100 relative overflow-hidden border-b border-slate-100">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Package className="w-12 h-12" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                        
                        {product.price > 0 && (
                          <div className="text-blue-600 font-extrabold text-xl mb-4">
                            ?{product.price.toLocaleString('en-IN')}
                          </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-md bg-slate-100 overflow-hidden shrink-0">
                              {product.business?.profile_image ? (
                                <img src={product.business.profile_image} className="w-full h-full object-cover" />
                              ) : (
                                <Building2 className="w-full h-full p-1 text-slate-400" />
                              )}
                            </div>
                            <span className="text-xs font-semibold text-slate-700 truncate">{product.business?.business_name}</span>
                            {product.business?.verified ? (
                              <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
                            ) : (
                              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Unverified Seller</span>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-slate-500 gap-3">
                            {product.business?.city && (
                              <span className="flex items-center gap-1 shrink-0"><MapPin className="w-3 h-3" /> {product.business.city}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-16 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                We couldn't find any products matching your current filters. Try adjusting your search or clearing filters.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustry('All');
                  setSelectedCity('All');
                  setVerifiedOnly(false);
                }}
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Global Styles for custom scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}
