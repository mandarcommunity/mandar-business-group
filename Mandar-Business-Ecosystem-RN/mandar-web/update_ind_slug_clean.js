const fs = require('fs');
const pageFile = 'app/industry/[slug]/page.js';

const newContent = `import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, MapPin, BadgeCheck, Phone, Mail, Globe, Search } from 'lucide-react';
import { INDUSTRIES } from '../../../constants/industries';
import { slugify, getIndustryEmoji } from '../../../lib/utils';

export default async function IndustryPage({ params }) {
  // Await params in Next.js 15+
  const { slug } = await params;
  
  // Find the exact industry name based on slug
  const industryName = INDUSTRIES.find(ind => slugify(ind) === slug);
  if (!industryName) return notFound();

  // Query Supabase for businesses that contain this industry in their industries array
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, business_name, slug, profile_image, city, state, verified, industries, description, primary_phone, email, website')
    .contains('industries', [industryName])
    .order('created_at', { ascending: false });

  const emoji = getIndustryEmoji(industryName);

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
      
      {/* Dynamic Header Section */}
      <div className="bg-gradient-to-b from-blue-900 to-indigo-900 text-white pt-10 pb-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <Link href="/industries" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Industries
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl border border-white/20 shadow-xl shrink-0">
              {emoji}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white">{industryName}</h1>
              <p className="text-lg text-blue-200 max-w-2xl">
                Explore trusted and verified B2B companies, manufacturers, and suppliers in the {industryName} sector.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20 pb-20">
        
        {/* Stats Bar Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 px-2 text-slate-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {businesses?.length || 0} Businesses Found
          </div>
        </div>

        {businesses && businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((biz) => (
              <Link href={\`/biz/\${biz.slug || biz.id}\`} key={biz.id}>
                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 border border-slate-200 transition-all duration-300 group flex flex-col h-full">
                  
                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                      {biz.profile_image && biz.profile_image.startsWith('http') ? (
                        <img src={biz.profile_image} alt={biz.business_name} className="w-full h-full object-cover" />
                      ) : (
                        biz.business_name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 flex items-center gap-1.5">
                        {biz.business_name}
                        {biz.verified && <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" title="Verified Business" />}
                      </h3>
                      <div className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {biz.city || 'Location N/A'}, {biz.state || ''}
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-600 text-sm line-clamp-2 mb-5 flex-grow leading-relaxed">
                    {biz.description || 'No detailed description provided by this business yet.'}
                  </p>
                  
                  {/* Action Bar (View Profile) */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex -space-x-1">
                      {biz.primary_phone && <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center border border-white"><Phone className="w-3 h-3 text-green-600" /></div>}
                      {biz.email && <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center border border-white"><Mail className="w-3 h-3 text-blue-600" /></div>}
                      {biz.website && <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center border border-white"><Globe className="w-3 h-3 text-purple-600" /></div>}
                    </div>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Profile <span className="text-lg leading-none">→</span>
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-200">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              {emoji}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">No businesses found yet</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
              There are currently no verified businesses listed under the {industryName} category.
            </p>
            <Link href="/industries" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-sm">
              Explore Other Industries
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(pageFile, newContent, 'utf8');
