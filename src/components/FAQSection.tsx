import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, HelpCircle, Ruler, Truck, RotateCcw, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { storeConfig } from '../data/config';
import { generateSupportWhatsAppUrl } from '../utils/whatsapp';

export interface FAQItem {
  id: string;
  category: 'sizing' | 'delivery' | 'ordering' | 'exchange';
  question: string;
  answer: string;
  tags?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export const faqsData: FAQItem[] = [
  // Sizing & Tailoring
  {
    id: 'faq-size-chart-ladies',
    category: 'sizing',
    question: 'How do standard sizes work for ladies’ stitched suits and ready-to-wear kurtis?',
    answer: 'Our stitched ready-to-wear kurtis and suits follow standard Pakistani tailoring specifications. Below is the standard size guide (measurements in inches):',
    tableData: {
      headers: ['Size', 'Chest', 'Waist', 'Hips', 'Shoulder', 'Shirt Length'],
      rows: [
        ['Small (S)', '38"', '34"', '40"', '14.5"', '39"'],
        ['Medium (M)', '40"', '36"', '43"', '15.0"', '40"'],
        ['Large (L)', '43"', '40"', '47"', '15.5"', '41"'],
        ['Extra Large (XL)', '46"', '43"', '50"', '16.5"', '42"'],
      ],
    },
    tags: ['size', 'measurements', 'ladies', 'kurti', 'chart'],
  },
  {
    id: 'faq-size-chart-gents',
    category: 'sizing',
    question: 'What are the dimensions for men’s Kurta Shalwar and waistcoats?',
    answer: 'Men’s Kurta Shalwar and waistcoats are crafted according to chest and collar sizes. We recommend selecting your true suit jacket or collar measurement:',
    tableData: {
      headers: ['Size', 'Chest', 'Collar / Band', 'Shoulder', 'Kurta Length', 'Shalwar Length'],
      rows: [
        ['Small (38)', '38"–39"', '14.5"', '17.5"', '40"', '40"'],
        ['Medium (40)', '40"–41"', '15.0"', '18.0"', '42"', '42"'],
        ['Large (42)', '42"–44"', '15.5"', '19.0"', '44"', '43"'],
        ['XL (44)', '45"–47"', '16.0"', '20.0"', '45"', '44"'],
      ],
    },
    tags: ['gents', 'kurta', 'waistcoat', 'collar', 'size'],
  },
  {
    id: 'faq-unstitched-dimensions',
    category: 'sizing',
    question: 'What fabric lengths are included with Unstitched Suits?',
    answer: 'For ladies’ 3-piece unstitched suits, the standard cut includes 3.0 meters for the shirt, 2.5 meters for the trousers, and 2.5 meters for the dupatta/shawl, providing ample fabric for any cut (straight, A-line, or flared). Men’s unstitched suits come in generous 4.5-meter lengths (54-inch standard loom width) sufficient for a full Kurta and Shalwar.',
    tags: ['unstitched', 'cutting', 'yards', 'meters', 'fabric'],
  },
  {
    id: 'faq-khaddar-shrinkage',
    category: 'sizing',
    question: 'Should I shrink (terap) handloom Khaddar or cotton before sending it to the tailor?',
    answer: 'Yes! Pure cottons and heavy Kamalia winter Khaddar are 100% natural fibers. We strongly advise soaking unstitched fabric in plain cold water for 2 to 3 hours and hanging it to dry in the shade before taking it to your master tailor. This guarantees your final tailored suit retains its precise fit forever.',
    tags: ['shrinkage', 'khaddar', 'tailoring', 'terap', 'cotton'],
  },

  // Shipping & Delivery
  {
    id: 'faq-delivery-timeline',
    category: 'delivery',
    question: 'How long does nationwide delivery take across Pakistan?',
    answer: 'We dispatch all confirmed orders within 24 to 48 hours. Domestic delivery takes 3 to 5 business days for major cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Gujranwala, Sialkot) and 4 to 6 business days for other regional areas.',
    tags: ['time', 'days', 'tcs', 'leopards', 'shipping'],
  },
  {
    id: 'faq-delivery-charges',
    category: 'delivery',
    question: 'What are the delivery charges, and how do I qualify for Free Shipping?',
    answer: 'We offer a standard flat courier fee of Rs. 250 across all of Pakistan. However, all orders totaling Rs. 6,000 or above automatically qualify for FREE nationwide courier delivery!',
    tags: ['charges', 'free', 'cost', 'fee', 'shipping'],
  },
  {
    id: 'faq-courier-partners',
    category: 'delivery',
    question: 'Which courier services do you use, and how can I track my parcel?',
    answer: 'We partner with Pakistan’s premier courier networks including TCS, Leopards Courier, and Trax Logistics. As soon as your parcel is registered at the dispatch hub, our team sends your official tracking number directly to your WhatsApp chat with a tracking link.',
    tags: ['tracking', 'courier', 'tcs', 'trax', 'leopards'],
  },

  // Ordering & WhatsApp
  {
    id: 'faq-how-to-order',
    category: 'ordering',
    question: 'How do I place an order through WhatsApp?',
    answer: 'Shopping with Fredo’s Collection is designed to be effortless: 1) Browse our catalogue and click "Add to Bag", choosing your preferred size. 2) Open your bag and click "Proceed to WhatsApp Order". 3) Enter your name, contact number, city, and street address. 4) A formatted order summary opens in WhatsApp. 5) Simply press "Send" in WhatsApp. Our representative will immediately verify stock and confirm your booking.',
    tags: ['order', 'whatsapp', 'checkout', 'how to'],
  },
  {
    id: 'faq-payment-methods',
    category: 'ordering',
    question: 'Do I pay online, or is Cash on Delivery (COD) available?',
    answer: 'You do not enter any credit or debit card details on our website. We provide Cash on Delivery (COD) for addresses across Pakistan—you pay the rider only when the parcel arrives at your doorstep. For customers preferring pre-payment, direct Bank Transfer, JazzCash, or Raast options are also coordinated via WhatsApp.',
    tags: ['payment', 'cod', 'cash', 'jazzcash', 'raast', 'bank'],
  },
  {
    id: 'faq-order-changes',
    category: 'ordering',
    question: 'Can I modify or cancel my order after sending the WhatsApp message?',
    answer: 'Yes! Because our orders are confirmed directly with human representatives on WhatsApp, you can request size changes, color swaps, or additional items anytime before the parcel is sealed and booked with the courier.',
    tags: ['modify', 'cancel', 'change', 'whatsapp'],
  },

  // Exchange & Quality
  {
    id: 'faq-exchange-policy',
    category: 'exchange',
    question: 'What is your Exchange & Return policy?',
    answer: 'We offer a hassle-free 7-Day Exchange Window starting from the day your parcel is delivered. If the outfit has a defect, an incorrect size was delivered, or you wish to exchange for another design, simply message us on WhatsApp (03051367640) with a photo of the item. Items must be unwashed, unworn, and have original tags intact.',
    tags: ['exchange', 'return', 'policy', 'days', 'refund'],
  },
  {
    id: 'faq-fabric-authenticity',
    category: 'exchange',
    question: 'Are your fabrics genuine Dhanak, Khaddar, and Lawn?',
    answer: 'Absolutely. We pride ourselves on transparent textile sourcing. Our Dhanak is heavy winter-weight weave, our Lawn is high-density combed 80s yarn, our Palachi velvet shawls use premium micro-velvet 9000, and our men’s Kurta fabrics are export-grade cottons and Wash & Wear.',
    tags: ['quality', 'fabric', 'genuine', 'dhanak', 'lawn', 'velvet'],
  },
  {
    id: 'faq-care-washing',
    category: 'exchange',
    question: 'How should I wash and care for heavily embroidered outfits and velvet shawls?',
    answer: 'For embroidered Dhanak shirts and velvet Palachi shawls with gold tilla work, dry cleaning is strongly recommended to protect thread luster. For daily lawns and casual cotton kurtas, gentle machine wash in cold water and iron on the reverse side.',
    tags: ['care', 'washing', 'iron', 'dry clean', 'velvet'],
  },
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sizing' | 'delivery' | 'ordering' | 'exchange'>('all');
  const [openId, setOpenId] = useState<string | null>('faq-size-chart-ladies');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQ = item.question.toLowerCase().includes(q);
        const matchesA = item.answer.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesQ && !matchesA && !matchesTags) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A36A]">
            Customer Support & Policies
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-neutral-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Everything you need to know about tailoring dimensions, nationwide delivery, Cash on Delivery, and our 7-day exchange window.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. size chart, TCS, exchange, unstitched)..."
            className="w-full pl-11 pr-10 py-3 bg-[#F8F6F2] border border-[#E8E4DD] rounded-xl text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#173D32] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-600"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions', icon: HelpCircle },
            { id: 'sizing', label: 'Sizing & Tailoring', icon: Ruler },
            { id: 'delivery', label: 'Delivery & Shipping', icon: Truck },
            { id: 'ordering', label: 'WhatsApp & Ordering', icon: MessageSquare },
            { id: 'exchange', label: 'Exchange & Fabric', icon: RotateCcw },
          ].map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                  active
                    ? 'border-[#173D32] bg-[#173D32] text-white shadow-xs'
                    : 'border-[#E8E4DD] bg-white text-neutral-700 hover:bg-[#F8F6F2]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#C6A36A]' : 'text-neutral-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#F8F6F2] rounded-xl border border-[#E8E4DD] p-6">
              <HelpCircle className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
              <h4 className="font-serif text-lg font-semibold text-neutral-800">
                No matching answers found
              </h4>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Couldn't find what you're looking for? Message our support team directly on WhatsApp for immediate guidance.
              </p>
              <a
                href={generateSupportWhatsAppUrl(searchQuery ? `Inquiry regarding: ${searchQuery}` : undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:bg-[#20ba59] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp (03051367640)</span>
              </a>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#173D32]/50 bg-white shadow-xs'
                      : 'border-[#E8E4DD] bg-[#F8F6F2]/50 hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-sm sm:text-base font-semibold text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#173D32] text-white' : 'bg-white text-neutral-500 border border-[#E8E4DD]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-[#E8E4DD]/60">
                      <p>{faq.answer}</p>

                      {/* Optional measurement table */}
                      {faq.tableData && (
                        <div className="mt-4 overflow-x-auto rounded-lg border border-[#E8E4DD]">
                          <table className="min-w-full divide-y divide-[#E8E4DD] text-left text-xs font-mono">
                            <thead className="bg-[#F8F6F2]">
                              <tr>
                                {faq.tableData.headers.map((h, i) => (
                                  <th
                                    key={i}
                                    className="px-3.5 py-2.5 font-bold text-neutral-800 uppercase tracking-wider"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#E8E4DD]">
                              {faq.tableData.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-neutral-50">
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className={`px-3.5 py-2 text-neutral-700 tabular-nums ${
                                        cIdx === 0 ? 'font-semibold text-neutral-900 font-sans' : ''
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Contact Box */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F8F6F2] rounded-2xl border border-[#E8E4DD] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#173D32] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#C6A36A]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-neutral-900">
                Have a question about custom tailoring or delivery?
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Our fashion consultants are online Monday – Sunday to assist you via WhatsApp.
              </p>
            </div>
          </div>

          <a
            href={generateSupportWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp ({storeConfig.phoneDisplay})</span>
          </a>
        </div>
      </div>
    </section>
  );
};
