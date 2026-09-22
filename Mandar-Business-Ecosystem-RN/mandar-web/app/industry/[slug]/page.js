import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, MapPin, BadgeCheck } from 'lucide-react';
import { INDUSTRIES } from '../../../constants/industries';
import { slugify } from '../../../lib/utils';

export default async function IndustryPage({ params }) {
  const { slug } = params;
  
  // Find the exact industry name based on slug
  const industryName = INDUSTRIES.find(ind => slugify(ind) === slug);
  if (!industryName) return notFound();

  // Query Supabase for businesses that contain this industry in their industries array
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, business_name, slug, profile_image, city, state, verified, industries, description')
    .contains('industries', [industryName])
    .order('created_at', { ascending: false });

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{industryName} Businesses</h1>
          <p className="text-xl text-slate-500 max-w-2xl">Connect with the best {industryName} enterprises in the Mandar Community.</p>
        </header>

        {businesses && businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((biz) => (
              <Link href={`/biz/${biz.slug}`} key={biz.id}>
                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-100 transition-all group flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                      {biz.profile_image && biz.profile_image.startsWith('http') ? (
                        <img src={biz.profile_image} alt={biz.business_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-2xl">
                          {biz.business_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl group-hover:text-blue-600 transition-colors flex items-center gap-1">
                        {biz.business_name}
                        {biz.verified && <BadgeCheck className="w-5 h-5 text-blue-500" />}
                      </h3>
                      <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {biz.city || 'Unknown City'}, {biz.state}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">{biz.description || 'No description provided.'}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {biz.industries?.slice(0,2).map((ind, i) => (
                      <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                        {ind}
                      </span>
                    ))}
                    {biz.industries?.length > 2 && <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">+{biz.industries.length - 2}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No businesses found</h3>
            <p className="text-slate-500">There are currently no verified businesses listed under {industryName}.</p>
          </div>
        )}
      </div>
    </div>
  );
}