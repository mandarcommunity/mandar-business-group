"use client";
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BackButton({ showHome = true, className = "" }) {
  const router = useRouter();
  return (
    <div className={"flex items-center gap-2 " + className}>
      <button onClick={() => router.back()} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-slate-900 border border-slate-200" title="Go Back">
        <ArrowLeft className="w-5 h-5" />
      </button>
      {showHome && (
        <Link href="/" className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-slate-900 border border-slate-200" title="Go to Home">
          <Home className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}