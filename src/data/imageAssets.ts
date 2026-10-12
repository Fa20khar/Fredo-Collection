/**
 * Central Fashion Image Assets with Primary Public Paths and Verified Fallbacks
 * Represents real Fredo's Collection inventory:
 * - Gents Handcrafted Pure Wool Shadar (Chadar Shawl)
 * - J. Asli Sona Gents Textured Kurta Shalwar
 * - Bin Saeed Premium Collection Vol-213 Dhanak Embroidered Suit with Velvet Palachi Shawl
 * - Mother Care 3-Piece Unstitched Printed Dhanak Suit with Dupatta
 * - Luxury Unstitched Floral & Chunri Printed Textiles
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

  // Real Gents Handcrafted Pure Wool Shadar (Chadar Shawl)
  gentsWoolShadar: {
    src: '/images/gents_wool_shadar.jpg',
    fallback: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80',
    alt: "Men's Handcrafted Pure Wool Chadar Shadar with Traditional Fringe & Embroidered Border",
  },

  // Real Gents J. Asli Sona Kurta Shalwar
  gentsAsliSona: {
    src: '/images/gents_asli_sona.jpg',
    fallback: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    alt: "J. Asli Sona Men's Forest Green Textured Kurta Shalwar Suit",
  },

  // Real Ladies Bin Saeed Vol-213 Embroidered Dhanak Suit with Velvet Palachi Shawl
  ladiesBinSaeed: {
    src: '/images/ladies_bin_saeed.jpg',
    fallback: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    alt: "Bin Saeed Vol-213 Luxury Embroidered Dhanak Suit with Velvet Palachi Shawl",
  },

  // Real Ladies Mother Care 3-Piece Printed Dhanak Suit
  ladiesMotherCare: {
    src: '/images/ladies_mother_care.jpg',
    fallback: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    alt: "Mother Care 3-Piece Unstitched Printed Dhanak Suit with Printed Dupatta",
  },

  // Real Luxury Unstitched Floral & Chunri Printed Textiles
  ladiesUnstitchedTextiles: {
    src: '/images/ladies_unstitched_textiles.jpg',
    fallback: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    alt: "Fredo's Collection Unstitched 3-Piece Printed Lawn & Chunri Fabric Rolls",
  },

  // Ladies Embroidered Suits (Dhanak / Chiffon)
  ladiesEmbroidered: {
    src: '/images/ladies_bin_saeed.jpg',
    fallback: '/images/ladies_embroidered.jpg',
    alt: "Women's Embroidered Dhanak Suit with Palachi Velvet Shawl",
  },

  // Ladies Printed Lawn & Unstitched Suits
  ladiesLawn: {
    src: '/images/ladies_mother_care.jpg',
    fallback: '/images/ladies_lawn.jpg',
    alt: "Women's Premium Dhanak & Lawn 3-Piece Unstitched Suit",
  },

  // Ladies Velvet & Pashmina Shawls
  ladiesVelvet: {
    src: '/images/ladies_bin_saeed.jpg',
    fallback: '/images/ladies_velvet.jpg',
    alt: "Royal Micro Velvet Palachi Shawl with Embroidered Motif",
  },

  // Gents Kurta Shalwar (Asli Sona Green / Textured Cotton)
  gentsKurta: {
    src: '/images/gents_asli_sona.jpg',
    fallback: '/images/gents_kurta.jpg',
    alt: "J. Asli Sona Men's Classic Textured Kurta Shalwar",
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

  // Gents Kashmiri Wool Pashmina Shawl / Shadar
  gentsShawl: {
    src: '/images/gents_wool_shadar.jpg',
    fallback: '/images/gents_shawl.jpg',
    alt: "Men's Handcrafted Kashmiri Pure Wool Chadar Shadar",
  },
};
