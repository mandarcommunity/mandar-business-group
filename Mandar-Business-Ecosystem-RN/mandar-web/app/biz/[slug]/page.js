export const dynamic = 'force-dynamic';
import { supabase } from '../../../lib/supabase';
import { ArrowLeft, MapPin, Phone, Briefcase, Factory, Mail, Globe, CheckCircle2, Package, ArrowRight, Zap, Calendar, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '../../../components/ShareButton';
import BackButton from '../../../components/BackButton';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: business } = await supabase
    .from('businesses')
    .select('business_name, description, profile_image')
    .eq(slug.includes('-') ? 'slug' : 'id', slug)
    .single();

  if (!business) return { title: 'Business Not Found' };

  return {
    title: `${business.business_name} | Official Website`,
    description: business.description || `Welcome to the official business page of ${business.business_name}.`,
    openGraph: {
      title: `${business.business_name} | Official Website`,
      description: business.description,
      images: business.profile_image && business.profile_image.startsWith("http") ? [business.profile_image] : [],
    },
  };
}

export default async function BusinessProfilePage({ params }) {
  const { slug } = await params;
  const isId = !slug.includes('-');

  const { data: business } = await supabase
    .from('businesses')
    .select(`*, user:users!user_id(full_name, mobile, email)`)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!business) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const phone = business.mobile || business.user?.mobile;
  const whatsapp = phone; 
  const email = business.email || business.user?.email;
  const validImage = business.profile_image && business.profile_image.startsWith("http");

  const productCount = products?.length || 0;
  const createdYear = new Date(business.created_at).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - createdYear;
  
  // Calculate industry layout
  const maxIndustriesToShow = 3;
  const displayedIndustries = business.industries?.slice(0, maxIndustriesToShow) || [];
  const extraIndustries = (business.industries?.length || 0) - maxIndustriesToShow;

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-200 pb-20">
      
      {/* MINI WEBSITE NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <BackButton className="mr-2" />
          {validImage ? (
            <img src={business.profile_image} className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" alt="logo" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {business.business_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="font-bold text-slate-900 text-lg leading-tight line-clamp-1 max-w-[200px] sm:max-w-xs">{business.business_name}</h2>
            {business.verified ? (
              <span className="text-xs text-blue-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Verified Seller</span>
            ) : (
              <span className="text-xs text-slate-500 font-bold border border-slate-200 bg-slate-50 px-1.5 py-0.5 rounded inline-block mt-1">Unverified Seller</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
           <ShareButton title={business.business_name} text={business.description} />
           {phone && (
             <a href={`tel:${phone}`} className="bg-slate-900 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-md flex items-center gap-2">
               <Phone className="w-4 h-4" /> <span className="hidden sm:inline">Call Us</span>
             </a>
           )}
        </div>
      </nav>

      {/* HERO SECTION (Website Feel) */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden mb-8 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
            {validImage ? (
              <img src={business.profile_image} className="w-full h-full object-cover" alt="Business Logo" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-5xl font-black text-white">
                {business.business_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            {business.business_name}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 text-slate-600 font-medium max-w-2xl">
            {(business.city || business.state) && (
              <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200 text-sm">
                <MapPin className="w-4 h-4 text-red-500" /> {business.city}{business.state ? `, ${business.state}` : ''}
              </span>
            )}
            
            {/* Show multiple industries nicely */}
            {displayedIndustries.map((ind, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200 text-sm">
                <Factory className="w-4 h-4 text-blue-500" /> {ind}
              </span>
            ))}
            {extraIndustries > 0 && (
              <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200 text-sm">
                +{extraIndustries} More
              </span>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            {whatsapp && (
              <a href={`https://wa.me/91${whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-green-500/30 hover:-translate-y-1">
                <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-8 py-3.5 rounded-2xl font-bold transition-all shadow-md border border-slate-200 hover:-translate-y-1">
                <Mail className="w-5 h-5 text-slate-400" /> Send Email
              </a>
            )}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div className="text-center">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3"><Package className="w-6 h-6"/></div>
               <h4 className="text-2xl font-black text-slate-900">{productCount}+</h4>
               <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Products</p>
            </div>
            <div className="text-center">
               <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3"><Zap className="w-6 h-6"/></div>
               <h4 className="text-2xl font-black text-slate-900">100%</h4>
               <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Response Rate</p>
            </div>
            <div className="text-center hidden md:block">
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3"><Calendar className="w-6 h-6"/></div>
               <h4 className="text-2xl font-black text-slate-900">{yearsActive > 0 ? `${yearsActive} Years` : 'New'}</h4>
               <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Active Since</p>
            </div>
            <div className="text-center hidden md:block">
               <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3"><TrendingUp className="w-6 h-6"/></div>
               <h4 className="text-2xl font-black text-slate-900">Verified</h4>
               <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Status</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-b border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">About Company</h2>
            <div className="prose prose-slate prose-lg">
              {business.description ? (
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{business.description}</p>
              ) : (
                <p className="text-slate-400 italic">Welcome to our official business page. We specialize in providing high-quality products and services to our esteemed clients.</p>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Business Details</h3>
            <ul className="space-y-5">
              {business.contact_person && (
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Briefcase className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Contact Person</p>
                    <p className="font-semibold text-slate-900">{business.contact_person}</p>
                  </div>
                </li>
              )}
              {business.business_types && business.business_types.length > 0 && (
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Factory className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Business Type</p>
                    <p className="font-semibold text-slate-900">{business.business_types.join(', ')}</p>
                  </div>
                </li>
              )}
              {business.website && (
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><Globe className="w-5 h-5" /></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Website</p>
                    <a href={`https://${business.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="font-semibold text-blue-600 hover:underline break-all">
                      {business.website}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCTS / SERVICES SHOWCASE */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Products & Services</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Browse through our premium catalog of offerings.</p>
          </div>
          
          {productCount > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link href={`/p/${product.slug || product.id}`} key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="h-60 bg-slate-100 relative overflow-hidden">
                    {product.images && product.images.length > 0 && product.images[0].startsWith("http") ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                        <Package className="w-16 h-16 text-slate-300" />
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                        {product.category}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>
                    <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm">
                      Enquire Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center max-w-2xl mx-auto">
              <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Catalog Update in Progress</h3>
              <p className="text-slate-500 mb-6">We are currently updating our digital catalog. Please contact us directly for product inquiries.</p>
              {whatsapp && (
                <a href={`https://wa.me/91${whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-bold transition-colors">
                  Contact Us
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA FOR VISITORS */}
      <section className="py-20 px-6 text-center">
         <div className="max-w-2xl mx-auto bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
               <h2 className="text-3xl font-extrabold text-white mb-4">Ready to do business?</h2>
               <p className="text-slate-400 mb-8 max-w-lg mx-auto">Get in touch directly using the contact details above to deal with zero commission and full transparency.</p>
               {phone && (
                 <a href={`tel:${phone}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-blue-500 transition-colors">
                   <Phone className="w-5 h-5" /> Call Now
                 </a>
               )}
            </div>
         </div>
      </section>

    </div>
  );
}
