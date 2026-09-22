import Link from 'next/link';
import BackButton from '../../components/BackButton';

export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <BackButton className="mb-8" />
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms & Conditions</h1>
      <div className="prose prose-slate max-w-none text-slate-700">
        <p className="mb-4 text-lg">Last Updated: June 2026</p>
        <p className="mb-8">By accessing or using the Mandar Community Ecosystem, you agree to comply with and be bound by the following Terms & Conditions. These terms are operated by Paxzillion Solutions LLP.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Business Responsibility</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Businesses are responsible for the accuracy of all information shared on the platform.</li>
          <li>Fake, misleading or fraudulent activities are strictly prohibited.</li>
          <li>Businesses must only upload authentic products, services and business details.</li>
          <li>Businesses are fully responsible for their transactions and communications with other users.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Verification Policy</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Verification badges are provided only after manual review.</li>
          <li>Submission of documents does not guarantee approval.</li>
          <li>Paxzillion Solutions LLP reserves the right to reject, suspend or remove verification at any time.</li>
          <li>Fake verification submissions may result in account restriction or removal.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Community Guidelines</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Respectful business communication is required at all times.</li>
          <li>Spam, harassment, abuse or illegal activity is prohibited.</li>
          <li>Users must not post harmful, offensive or misleading content.</li>
          <li>Accounts violating platform policies may be suspended or permanently removed.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Account & Platform Access</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Users must be at least 18 years old to use this platform.</li>
          <li>The platform may be updated, modified or temporarily unavailable without prior notice.</li>
          <li>Paxzillion Solutions LLP reserves the right to suspend or terminate accounts violating platform policies.</li>
        </ul>
      </div>
    </div>
  );
}
