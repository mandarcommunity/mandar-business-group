const fs = require('fs');
const content = `import { supabase } from '../../../lib/supabase';
import { Briefcase, MapPin, Factory, Calendar, MessageCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data: req } = await supabase.from('requirements').select('title, description').eq(slug.includes('-') ? 'slug' : 'id', slug).single();
  if (!req) return { title: 'Requirement Not Found' };
  return {
    title: \`\${req.title} | B2B Leads\`,
    description: req.description,
  };
}

export default async function RequirementPage({ params }) {
  const { slug } = params;
  const isId = !slug.includes('-');

  const { data: req } = await supabase
    .from('requirements')
    .select(\`
      *,
      user:users!user_id(full_name, mobile),
      business:businesses!business_id(business_name, slug, profile_image)
    \`)
    .eq(isId ? 'id' : 'slug', slug)
    .single();

  if (!req) notFound();

  const business = req.business || null;
  const phone = req.user?.mobile;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-secondary px-8 py-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 opacity-90" />
            <h2 className="font-bold text-lg opacity-90">Business Requirement</h2>
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Lead</span>
        </div>
        
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{req.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {(req.city || req.state) && (
              <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg text-sm border border-gray-100">
                <MapPin className="w-4 h-4 text-gray-400" />
                {req.city}{req.state ? \`, \${req.state}\` : ''}
              </div>
            )}
            {req.industries && req.industries.length > 0 && (
              <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg text-sm border border-gray-100">
                <Factory className="w-4 h-4 text-gray-400" />
                {req.industries.join(', ')}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg text-sm border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400" />
              Posted {new Date(req.created_at).toLocaleDateString()}
            </div>
          </div>
          
          <div className="prose prose-sm text-gray-700 mb-8 whitespace-pre-wrap leading-relaxed">
            {req.description}
          </div>
          
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                {req.user?.full_name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted by</p>
                <p className="font-bold text-gray-900">{req.user?.full_name || 'Anonymous User'}</p>
                {business && (
                  <Link href={\`/biz/\${business.slug}\`} className="text-sm text-secondary hover:underline">
                    {business.business_name}
                  </Link>
                )}
              </div>
            </div>
            
            {phone && (
              <a href={\`https://wa.me/91\${phone.replace(/\\D/g, '')}\`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-bold transition-transform active:scale-95 w-full sm:w-auto justify-center">
                <MessageCircle className="w-5 h-5" /> Discuss Requirement
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}`;
fs.writeFileSync('app/req/[slug]/page.js', content);
