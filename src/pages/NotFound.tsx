import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="font-serif text-6xl sm:text-8xl font-bold text-[#173D32]/20">
        404
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900 mt-2">
        Page Not Found
      </h2>
      <p className="text-sm text-neutral-600 mt-2 max-w-sm">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#173D32] hover:bg-[#122e25] text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};
