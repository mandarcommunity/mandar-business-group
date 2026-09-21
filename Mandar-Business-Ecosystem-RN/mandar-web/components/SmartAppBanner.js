"use client";
import { useState, useEffect } from 'react';

export default function SmartAppBanner() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !show) return null;

  return (
    <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-md z-50 sticky top-0">
      <div className="flex flex-col">
        <span className="font-semibold text-sm">Mandar Community App</span>
        <span className="text-xs opacity-90">Get the full experience on Android</span>
      </div>
      <div className="flex items-center gap-3">
        <a 
          href="https://play.google.com/store/apps/details?id=com.mandar.community" 
          className="bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-sm active:scale-95 transition-transform"
        >
          Open App
        </a>
        <button 
          onClick={() => setShow(false)} 
          className="p-1 opacity-70 hover:opacity-100"
          aria-label="Close"
        >
          ?
        </button>
      </div>
    </div>
  );
}
