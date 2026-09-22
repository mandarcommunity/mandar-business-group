import { supabase } from '../../../lib/supabase';
import { Briefcase, MapPin, Factory, Calendar, Lock, ArrowRight, Download, EyeOff } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BackButton from '../../../components/BackButton';
import ShareButton from '../../../components/ShareButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: req } = await supabase.from('requirements').select('title, description').eq(slug.includes('-') ? 'slug' : 'id', slug).single();
  if (!req) return { title: 'Requirement Not Found' };
  return {
    title: `${req.title} | Mandar B2B Leads`,
    description: req.description,
  };
}

export default async function RequirementPage({ params }) {
  const { slug } = await params;
  const isId = !slug.includes('-');

  const { data: req } = await supabase
    .from('requirements')
    .select(`
      *,
      user:users!user_id(full_name),
      business:businesses!business_id(business_name, slug, profile_image)
    `)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!req) notFound();

  const business = req.business || null;
  const isAnonymous = !req.user || !req.user.full_name;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Mini Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate max-w-[150px]">B2B Leads</span>
          </div>
        </div>
        <ShareButton title={req.title} text={`I found a new B2B Requirement on Mandar Community: ${req.title}`} />
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-10">
        
        {/* Lead Alert Banner */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-8 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 mb-1">Contact Details Hidden (Anti-Spam Protection)</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              To protect our buyers from spam, direct contact details and WhatsApp numbers are only visible to verified members inside the Mandar Community App.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] bg-slate-900 px-8 py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 mb-4 shadow-sm">
                  <Briefcase className="w-3.5 h-3.5" /> Buyer Requirement
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {req.title}
                </h1>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-blue-200 text-sm font-semibold mb-1">Posted On</p>
                <p className="text-white font-bold text-lg flex items-center justify-end gap-2">
                  <Calendar className="w-5 h-5 opacity-80" /> {new Date(req.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            
            <div className="flex flex-wrap gap-3 mb-8">
              {(req.city || req.state) && (
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-2 rounded-xl text-sm border border-slate-200 font-semibold shadow-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {req.city}{req.state ? `, ${req.state}` : ''}
                </div>
              )}
              {req.industries && req.industries.length > 0 && (
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-2 rounded-xl text-sm border border-slate-200 font-semibold shadow-sm">
                  <Factory className="w-4 h-4 text-slate-400" />
                  {req.industries.join(', ')}
                </div>
              )}
            </div>
            
            <div className="prose prose-slate max-w-none mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Requirement Description</h3>
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">{req.description}</p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8 border border-slate-200 shadow-inner">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-14 h-14 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden">
                  <EyeOff className="w-6 h-6 absolute z-10" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Posted by</p>
                  <div className="blur-[4px] select-none">
                    <p className="font-bold text-slate-900 text-lg">Hidden Contact Name</p>
                    <p className="text-sm text-blue-600 font-medium">Business Hidden</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <a href="https://play.google.com/store/apps/details?id=com.mandarcommunity" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-md shadow-blue-600/20 group w-full">
                  <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> 
                  Download App to Contact
                  <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform ml-1" />
                </a>
                <p className="text-[10px] text-center text-slate-500 mt-3 font-semibold uppercase tracking-wider">Free on Google Play</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
