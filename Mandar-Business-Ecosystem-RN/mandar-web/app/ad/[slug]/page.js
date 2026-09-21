import { supabase } from '../../../lib/supabase';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data: ad } = await supabase.from('advertisements').select('title, description, image_url').eq(slug.includes('-') ? 'slug' : 'id', slug).single();
  if (!ad) return { title: 'Advertisement Not Found' };
  return {
    title: `${ad.title} | Promoted`,
    description: ad.description,
    openGraph: {
      title: ad.title,
      description: ad.description,
      images: ad.image_url ? [ad.image_url] : [],
    },
  };
}

export default async function AdPage({ params }) {
  const { slug } = params;
  const isId = !slug.includes('-');

  const { data: ad } = await supabase
    .from('advertisements')
    .select(`
      *,
      business:businesses!business_id(business_name, slug, profile_image)
    `)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!ad) notFound();

  const business = ad.business || null;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center justify-center py-12 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        {ad.image_url && (
          <img src={ad.image_url} alt="" className="w-full h-full object-cover opacity-20 blur-xl" />
        )}
        <div className="absolute inset-0 bg-gray-900/80"></div>
      </div>
      
      <div className="z-10 max-w-2xl w-full">
        {business && (
          <Link href={`/biz/${business.slug}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to {business.business_name}
          </Link>
        )}
        
        <div className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl">
          {ad.image_url ? (
            <div className="w-full aspect-video bg-gray-100">
              <img src={ad.image_url} alt={ad.title} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold tracking-widest uppercase opacity-50">PROMOTED</span>
            </div>
          )}
          
          <div className="p-8 md:p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{ad.title}</h1>
            <p className="text-gray-600 mb-8 whitespace-pre-wrap leading-relaxed max-w-lg mx-auto">
              {ad.description}
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <a 
                href="https://play.google.com/store/apps/details?id=com.mandar.community" 
                className="bg-secondary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2 transition-transform active:scale-95 w-full sm:w-auto justify-center"
              >
                {ad.cta_type || "Learn More"} <ExternalLink className="w-5 h-5" />
              </a>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Advertisement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}