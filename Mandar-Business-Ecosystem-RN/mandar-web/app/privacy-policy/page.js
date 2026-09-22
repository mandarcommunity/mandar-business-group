import Link from 'next/link';
import BackButton from '../../components/BackButton';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackButton className="mb-8" />
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none text-slate-700">
        <p className="mb-4 text-lg">Last Updated: June 2026</p>
        <p className="mb-8">Your privacy matters to us at Paxzillion Solutions LLP. This Privacy Policy explains how we collect, use, and protect your information when you use the Mandar Community Ecosystem.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Information We Collect</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Full Name and Mobile Number</li>
          <li>Email Address</li>
          <li>Business Information and Verification Documents</li>
          <li>Product, Catalog and Advertisement Data</li>
          <li>Feedback and Support Information</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How We Use Information</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Account creation and login authentication</li>
          <li>Business verification and trust management</li>
          <li>Platform security and fraud prevention</li>
          <li>Improving platform experience and business networking</li>
          <li>Customer support and communication</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Data Sharing</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Paxzillion Solutions LLP does not sell user personal data to third parties.</li>
          <li>Certain business details may be visible publicly within the business ecosystem.</li>
          <li>Verification documents are used only for verification and security purposes.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Security</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Reasonable security measures are used to protect user data.</li>
          <li>Users are responsible for maintaining account security and protecting login credentials.</li>
          <li>Unauthorized access, abuse or misuse of the platform is prohibited.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">User Rights</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Users may request profile updates or account deletion.</li>
          <li>Users may contact support for data related concerns.</li>
          <li>Users may stop using the platform at any time.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Children's Privacy</h2>
        <p className="mb-6">This platform is not intended for users under 18 years of age.</p>
      </div>
    </div>
  );
}
