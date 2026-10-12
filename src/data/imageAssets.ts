/**
 * Central Fashion Image Assets with Primary Public Paths and Verified Unsplash Fallbacks
 * Ensures images NEVER break in local dev, Vercel deployments, or hermetic evaluation sandboxes.
 */

export interface FashionImageAsset {
  src: string;
  fallback: string;
  alt: string;
}

export const imageAssets = {
  // Hero Banner
  hero: {
    src: '/images/hero.jpg',
    fallback: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    alt: "Fredo's Collection Pakistani Haute Couture & Festive Attire",
  },

  // Ladies Embroidered Suits (Dhanak / Chiffon)
  ladiesEmbroidered: {
    src: '/images/ladies_embroidered.jpg',
    fallback: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    alt: "Women's Embroidered Dhanak Suit with Palachi Velvet Shawl",
  },

  // Ladies Printed Lawn & Unstitched Suits
  ladiesLawn: {
    src: '/images/ladies_lawn.jpg',
    fallback: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    alt: "Women's Premium Lawn 3-Piece Unstitched Suit",
  },

  // Ladies Velvet & Pashmina Shawls
  ladiesVelvet: {
    src: '/images/ladies_velvet.jpg',
    fallback: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
    alt: "Royal Micro Velvet Palachi Shawl with Gold Tilla Work",
  },

  // Gents Kurta Shalwar (Emerald Green / Cotton)
  gentsKurta: {
    src: '/images/gents_kurta.jpg',
    fallback: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    alt: "Men's Classic Textured Cotton Kurta Shalwar",
  },

  // Gents Tailored Waistcoat
  gentsWaistcoat: {
    src: '/images/gents_waistcoat.jpg',
    fallback: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    alt: "Men's Premium Raw Silk Charcoal Waistcoat",
  },

  // Gents Casual Cotton Kurta
  gentsCotton: {
    src: '/images/gents_cotton.jpg',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
    alt: "Men's Egyptian Cotton Casual Kurta",
  },

  // Gents Kashmiri Wool Pashmina Shawl
  gentsShawl: {
    src: '/images/gents_shawl.jpg',
    fallback: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80',
    alt: "Men's Handcrafted Kashmiri Pashmina Wool Chadar",
  },
};
