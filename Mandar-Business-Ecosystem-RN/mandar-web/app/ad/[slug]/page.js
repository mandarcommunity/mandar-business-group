import { supabase } from '../../../lib/supabase';
import { ArrowRight, ExternalLink, Calendar, Megaphone } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BackButton from '../../../components/BackButton';
import ShareButton from '../../../components/ShareButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: ad } = await supabase.from('advertisements').select('title, description, image_url').eq(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-/.test(slug) ? 'id' : 'slug', slug).single();
  if (!ad) return { title: 'Advertisement Not Found' };
  return {
    title: `${ad.title} | Promoted`,
    description: ad.description,
    openGraph: {
      title: ad.title,
      description: ad.description,
      images: ad.image_url && ad.image_url.startsWith("http") ? [ad.image_url] : [],
    },
  };
}

export default async function AdPage({ params }) {
  const { slug } = await params;
  const isId = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-/.test(slug);

  const { data: ad } = await supabase
    .from('advertisements')
    .select(`
      *,
      business:businesses(business_name, slug, profile_image)
    `)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!ad) notFound();

  const business = ad.business || null;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            {business && (
              <>
                <Link href={`/biz/${business.slug}`} className="hover:text-blue-600 transition-colors truncate max-w-[150px]">{business.business_name}</Link>
                <span className="text-gray-300">/</span>
              </>
            )}
            <span className="text-gray-900 truncate max-w-[150px]">Advertisement</span>
          </div>
        </div>
        <ShareButton title={ad.title} text={`Check out this advertisement on Mandar Community: ${ad.title}`} />
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-10">
        
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] bg-slate-900 px-8 py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 mb-4 shadow-sm">
                  <Megaphone className="w-3.5 h-3.5" /> Promoted
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {ad.title}
                </h1>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-blue-200 text-sm font-semibold mb-1">Posted On</p>
                <p className="text-white font-bold text-lg flex items-center justify-end gap-2">
                  <Calendar className="w-5 h-5 opacity-80" /> {new Date(ad.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            {ad.image_url && ad.image_url.startsWith("http") && (
              <div className="w-full aspect-video bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden mb-8 shadow-sm flex items-center justify-center p-4">
                <img src={ad.image_url} alt={ad.title} className="w-full h-full object-contain rounded-xl" />
              </div>
            )}
            
            <div className="mb-10">
              <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                Advertisement Details
              </h3>
              <div className="text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-100 text-[15px]">
                {ad.description || "No description provided."}
              </div>
            </div>
            
            {business && (
              <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                    {business.profile_image ? (
                      <img src={business.profile_image} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <span className="text-slate-400 font-bold text-xl">{business.business_name?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Promoted by</p>
                    <Link href={`/biz/${business.slug}`} className="font-bold text-lg text-slate-900 hover:text-blue-600 transition-colors">
                      {business.business_name}
                    </Link>
                  </div>
                </div>
                <Link href={`/biz/${business.slug}`} className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
            
            <a 
              href="https://play.google.com/store/apps/details?id=com.mandar.community" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 w-full"
            >
              {ad.cta_type || "Learn More"} <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
