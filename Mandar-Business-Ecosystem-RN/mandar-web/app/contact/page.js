
import { Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Contact Us</h1>
      <p className="text-xl text-slate-500 mb-12">
        Have questions, feedback, or need support with your business listing? We're here to help.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
          <p className="text-slate-600 mb-4">For privacy, policy, or general inquiries, reach out to us via email.</p>
          <a href="mailto:support@paxzillionsolutions.com" className="text-blue-600 font-semibold hover:underline">
            support@paxzillionsolutions.com
          </a>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Operated By</h3>
          <p className="text-slate-600 mb-4">
            Mandar Community Ecosystem is proudly operated and managed by:
          </p>
          <p className="font-semibold text-slate-900">Paxzillion Solutions LLP</p>
        </div>
      </div>
    </div>
  );
}
