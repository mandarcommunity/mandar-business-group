import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { INDUSTRIES } from '../../constants/industries';
import { slugify, getIndustryEmoji } from '../../lib/utils';

export default function IndustriesPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">All Industries</h1>
          <p className="text-xl text-slate-500 max-w-2xl">Browse the complete list of {INDUSTRIES.length} business sectors present in the Mandar Community.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry, i) => {
            const colors = [
              "bg-blue-50 text-blue-700 hover:bg-blue-100",
              "bg-purple-50 text-purple-700 hover:bg-purple-100",
              "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
              "bg-orange-50 text-orange-700 hover:bg-orange-100",
              "bg-pink-50 text-pink-700 hover:bg-pink-100",
            ];
            const colorClass = colors[i % colors.length];

            return (
              <Link href={`/industry/${slugify(industry)}`} key={i}>
                <div className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all ${colorClass}`}>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <span className="text-xl">{getIndustryEmoji(industry)}</span>
                  </div>
                  <span className="font-semibold text-sm leading-tight">{industry}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}