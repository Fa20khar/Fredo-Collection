import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('success');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#173D32] text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs font-semibold tracking-widest text-[#C6A36A] uppercase">
          Exclusive Previews & Lookbooks
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-2 text-white">
          Stay in Style
        </h2>
        <p className="text-sm sm:text-base text-white/80 mt-3 max-w-xl mx-auto leading-relaxed">
          Discover new arrivals, seasonal collections, and the latest styles from Fredo's Collection.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-4 bg-white/10 rounded-lg max-w-md mx-auto border border-white/20 text-center animate-in fade-in duration-300">
            <CheckCircle2 className="w-8 h-8 text-[#C6A36A] mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">Thank you for connecting with us!</p>
            <p className="text-xs text-white/70 mt-1">
              (Demo preview: Your email <span className="text-[#C6A36A]">{email}</span> has been logged for seasonal launch updates.)
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setEmail('');
              }}
              className="mt-3 text-xs text-white/80 underline hover:text-white"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/20 text-sm focus:outline-hidden focus:border-[#C6A36A]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C6A36A] hover:bg-[#d6b782] text-neutral-900 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-red-300 mt-2">Please enter a valid email address.</p>
        )}
      </div>
    </section>
  );
};
