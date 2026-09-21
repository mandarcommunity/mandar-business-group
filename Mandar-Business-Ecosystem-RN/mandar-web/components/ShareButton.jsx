"use client";
import { Share2 } from 'lucide-react';
export default function ShareButton({ title, text }) {
  const handleShare = async () => {
    if (typeof navigator !== 'undefined') {
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url: window.location.href });
        } catch (e) {}
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    }
  };
  return (
    <button onClick={handleShare} className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors px-3">
      <Share2 className="w-4 h-4" /> Share
    </button>
  );
}
