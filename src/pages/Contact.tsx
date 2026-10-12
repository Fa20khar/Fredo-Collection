import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { storeConfig } from '../data/config';
import { generateSupportWhatsAppUrl } from '../utils/whatsapp';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedStatus, setSubmittedStatus] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!phone.trim() && !email.trim()) {
      errs.phone = 'Please provide either a phone number or email address';
    }
    if (!message.trim()) errs.message = 'Please enter your message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (preferredChannel === 'whatsapp') {
      const formatted = `Salam Fredo's Collection!\nName: ${name}\nSubject: ${subject || 'General Inquiry'}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`;
      const url = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(formatted)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const mailtoUrl = `mailto:${storeConfig.email}?subject=${encodeURIComponent(subject || 'Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
    }

    setSubmittedStatus(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-[#173D32] text-white py-14 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
            Customer Support
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium mt-1">
            Contact Fredo's Collection
          </h1>
          <p className="text-sm sm:text-base text-white/80 mt-2 max-w-lg mx-auto">
            We are here to assist you with inquiries, custom sizing advice, bulk orders, and nationwide courier updates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
                Direct Lines
              </span>
              <h2 className="font-serif text-2xl font-semibold text-neutral-900 mt-0.5">
                Get in Touch Directly
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Connect instantly through WhatsApp for the fastest reply regarding fabric availability, stitching, or delivery status.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp Card */}
              <div className="p-5 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-neutral-500 font-medium">WhatsApp Assistance</div>
                  <div className="font-semibold text-neutral-900 text-sm mt-0.5">
                    {storeConfig.phoneDisplay}
                  </div>
                  <a
                    href={generateSupportWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#128C7E] hover:underline"
                  >
                    <span>Open WhatsApp Chat →</span>
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#173D32] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5 text-[#C6A36A]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-neutral-500 font-medium">Direct Phone Call</div>
                  <div className="font-semibold text-neutral-900 text-sm mt-0.5">
                    {storeConfig.phoneDisplay}
                  </div>
                  <a
                    href={`tel:${storeConfig.phoneDisplay}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:underline"
                  >
                    <span>Click to Call →</span>
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#173D32] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5 text-[#C6A36A]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-neutral-500 font-medium">Official Email</div>
                  <div className="font-semibold text-neutral-900 text-sm mt-0.5 break-all">
                    {storeConfig.email}
                  </div>
                  <a
                    href={`mailto:${storeConfig.email}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:underline"
                  >
                    <span>Send Email Message →</span>
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-5 bg-white rounded-xl border border-[#E8E4DD] flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F8F6F2] text-neutral-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#C6A36A]" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-medium">Operational Timings</div>
                  <div className="font-semibold text-neutral-900 text-sm mt-0.5">
                    Monday – Sunday: 10:00 AM – 10:00 PM (PKT)
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Direct orders dispatched daily via express courier.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#F8F6F2] p-6 sm:p-10 rounded-2xl border border-[#E8E4DD] shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900 mb-2">
              Send a Message or Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
              Fill in your details below and choose whether to send via WhatsApp or Email.
            </p>

            {submittedStatus && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 text-xs text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm">Action Initiated!</strong>
                  Your message has been transferred to your chosen app ({preferredChannel === 'whatsapp' ? 'WhatsApp' : 'Email'}). Please send it in the app to complete submission.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Umer Jutt"
                    className="w-full text-xs p-3 bg-white border border-[#E8E4DD] rounded-lg focus:outline-hidden focus:border-[#173D32]"
                  />
                  {errors.name && <p className="text-[11px] text-[#B42318] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="03051367640"
                    className="w-full text-xs p-3 bg-white border border-[#E8E4DD] rounded-lg focus:outline-hidden focus:border-[#173D32]"
                  />
                  {errors.phone && <p className="text-[11px] text-[#B42318] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="umeryjutt345@gmail.com"
                    className="w-full text-xs p-3 bg-white border border-[#E8E4DD] rounded-lg focus:outline-hidden focus:border-[#173D32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Bulk order / Dhanak fabric query"
                    className="w-full text-xs p-3 bg-white border border-[#E8E4DD] rounded-lg focus:outline-hidden focus:border-[#173D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Tell us what you are looking for..."
                  className="w-full text-xs p-3 bg-white border border-[#E8E4DD] rounded-lg focus:outline-hidden focus:border-[#173D32]"
                />
                {errors.message && <p className="text-[11px] text-[#B42318] mt-1">{errors.message}</p>}
              </div>

              {/* Preferred Channel Selector */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Send message via:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferredChannel('whatsapp')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      preferredChannel === 'whatsapp'
                        ? 'border-[#25D366] bg-[#25D366]/10 text-[#128C7E]'
                        : 'border-[#E8E4DD] bg-white text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredChannel('email')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      preferredChannel === 'email'
                        ? 'border-[#173D32] bg-[#173D32]/10 text-[#173D32]'
                        : 'border-[#E8E4DD] bg-white text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#173D32]" />
                    <span>Email App</span>
                  </button>
                </div>
              </div>

              {/* Frontend-only notice adhering to Section 17 */}
              <div className="p-3 bg-white rounded-lg border border-[#E8E4DD] flex items-start gap-2.5 text-xs text-neutral-600">
                <AlertCircle className="w-4 h-4 text-[#C6A36A] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  Notice: To ensure privacy and direct delivery, this form will open {preferredChannel === 'whatsapp' ? 'WhatsApp' : 'your default email app'} with your prefilled inquiry.
                </span>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 px-6 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 text-white shadow-xs transition-colors cursor-pointer ${
                  preferredChannel === 'whatsapp'
                    ? 'bg-[#25D366] hover:bg-[#20ba59]'
                    : 'bg-[#173D32] hover:bg-[#122e25]'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {preferredChannel === 'whatsapp'
                    ? 'Launch WhatsApp Message'
                    : 'Compose Email to Fredo’s'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
