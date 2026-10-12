import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Sparkles, Copy, Check, Gift } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState<'all' | 'ladies' | 'gents'>('all');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'already'>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('fredos_newsletter_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setStatus('already');
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setStatus('error');
      return;
    }

    try {
      localStorage.setItem('fredos_newsletter_email', cleanEmail);
      localStorage.setItem('fredos_newsletter_pref', preference);
      localStorage.setItem('fredos_newsletter_date', new Date().toISOString());
    } catch {
      // ignore
    }

    setStatus('success');
  };

  const copyVoucherCode = () => {
    navigator.clipboard.writeText('FREDO10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#173D32] text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-2xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#C6A36A]/10 pointer-events-none blur-2xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C6A36A] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive VIP Member Privileges</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-medium mt-1 text-white">
          Join the Fredo's Fashion Circle
        </h2>
        <p className="text-sm sm:text-base text-white/80 mt-3 max-w-xl mx-auto leading-relaxed">
          Subscribe for early lookbook previews, seasonal Lawn & Dhanak drops, and receive an instant <strong className="text-[#C6A36A] font-semibold">10% OFF voucher code</strong> for your next WhatsApp order.
        </p>

        {/* Preference selector */}
        {status !== 'success' && status !== 'already' && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-xs text-white/70 hidden sm:inline">I am shopping for:</span>
            <div className="inline-flex bg-white/10 p-1 rounded-lg border border-white/15 text-xs font-medium">
              {(
                [
                  { id: 'all', label: 'All Collections' },
                  { id: 'ladies', label: "Ladies' Wear" },
                  { id: 'gents', label: "Gents' Wear" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPreference(tab.id)}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    preference === tab.id
                      ? 'bg-[#C6A36A] text-neutral-900 font-semibold shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === 'success' || status === 'already' ? (
          <div className="mt-8 p-6 bg-white/10 rounded-2xl max-w-lg mx-auto border border-white/20 text-center animate-in fade-in zoom-in-95 duration-300 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-full bg-[#C6A36A]/20 border border-[#C6A36A]/40 flex items-center justify-center mx-auto mb-3 text-[#C6A36A]">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="text-base sm:text-lg font-serif font-semibold text-white">
              {status === 'already' ? "You're Already an Active VIP Member!" : 'Welcome to Fredo’s Collection! 🎉'}
            </h4>
            <p className="text-xs text-white/80 mt-1 max-w-md mx-auto">
              Your email <span className="text-[#C6A36A] font-mono font-medium">{email}</span> is enrolled. Use your exclusive discount code when ordering via WhatsApp:
            </p>

            {/* Voucher Box */}
            <div className="mt-4 p-3 bg-black/30 border border-white/20 rounded-xl flex items-center justify-between gap-3 max-w-xs mx-auto">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/60 block text-left">Coupon Code</span>
                <span className="font-mono text-lg font-bold tracking-widest text-[#C6A36A]">FREDO10</span>
              </div>
              <button
                type="button"
                onClick={copyVoucherCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C6A36A] hover:bg-[#d6b782] text-neutral-900 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neutral-900" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-900" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Valid on all stitched & unstitched items
              </span>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('fredos_newsletter_email');
                  } catch {
                    // ignore
                  }
                  setStatus('idle');
                  setEmail('');
                }}
                className="underline hover:text-white transition-colors cursor-pointer"
              >
                Change Email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/20 text-sm focus:outline-hidden focus:border-[#C6A36A] focus:ring-1 focus:ring-[#C6A36A]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C6A36A] hover:bg-[#d6b782] text-neutral-900 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                <span>Get 10% Off</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-white/60 mt-2 text-left sm:text-center">
              We respect your privacy. No spam — only genuine seasonal updates & coupon codes.
            </p>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-red-300 mt-2">Please enter a valid email address.</p>
        )}
      </div>
    </section>
  );
};
