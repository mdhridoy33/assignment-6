import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0b0c10] border-t border-gray-800/60 py-6 px-4 sm:px-8 text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    
        <Link href="/" className="flex items-center gap-2">
       
          <span className="text-lime-400 text-xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M6 5v14h3V5H6zm12 0v14h3V5h-3zM3 9v6h3V9H3zm15 0v6h3V9h-3zM8 11h8v2H8v-2z" />
            </svg>
          </span>
          <span className="text-white font-black uppercase tracking-wider text-lg">
            FITLOG
          </span>
        </Link>

   
        <p className="text-xs sm:text-sm text-gray-400 font-medium text-center sm:text-right">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
