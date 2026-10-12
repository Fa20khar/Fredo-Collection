export interface CategoryItem {
  id: string;
  name: string;
  gender: 'ladies' | 'gents';
  description: string;
  image: string;
  itemCount: number;
}

export const categories: CategoryItem[] = [
  // Ladies
  {
    id: 'unstitched-suits',
    name: 'Unstitched Suits',
    gender: 'ladies',
    description: 'Premium Dhanak, Lawn, and Linen unstitched 3-piece fabrics crafted for custom tailoring.',
    image: '/src/assets/images/ladies_printed_lawn_1791770740917.jpg',
    itemCount: 14,
  },
  {
    id: 'embroidered-suits',
    name: 'Embroidered Suits',
    gender: 'ladies',
    description: 'Intricate thread embroidery and gold tilla work on luxury seasonal fabrics.',
    image: '/src/assets/images/ladies_embroidered_suit_1791770714880.jpg',
    itemCount: 18,
  },
  {
    id: 'ready-to-wear-ladies',
    name: 'Ready-to-Wear',
    gender: 'ladies',
    description: 'Stitched to perfection with flattering silhouettes and refined Pakistani cuts.',
    image: '/src/assets/images/hero_editorial_pakistani_1791770700977.jpg',
    itemCount: 10,
  },
  {
    id: 'casual-wear-ladies',
    name: 'Casual Wear',
    gender: 'ladies',
    description: 'Comfortable printed kurtis and lightweight breathable summer-winter cottons.',
    image: '/src/assets/images/ladies_printed_lawn_1791770740917.jpg',
    itemCount: 12,
  },
  {
    id: 'formal-wear-ladies',
    name: 'Formal Wear',
    gender: 'ladies',
    description: 'Festive occasion wear with hand embellishments, sequins, and organza dupattas.',
    image: '/src/assets/images/hero_editorial_pakistani_1791770700977.jpg',
    itemCount: 8,
  },
  {
    id: 'shawls-and-dupattas',
    name: 'Shawls and Dupattas',
    gender: 'ladies',
    description: 'Opulent Palachi velvet shawls, Pashmina wraps, and embroidered borders.',
    image: '/src/assets/images/ladies_velvet_shawl_1791770817343.jpg',
    itemCount: 16,
  },

  // Gents
  {
    id: 'kurta-shalwar',
    name: 'Kurta Shalwar',
    gender: 'gents',
    description: 'Timeless traditional suits in classic Pakistani silhouettes with band collar details.',
    image: '/src/assets/images/gents_kurta_shalwar_1791770727089.jpg',
    itemCount: 16,
  },
  {
    id: 'mens-unstitched-fabric',
    name: 'Men\'s Unstitched Fabric',
    gender: 'gents',
    description: 'Export-quality Latha, Boski, Wash & Wear, and pure Egyptian cotton fabric lengths.',
    image: '/src/assets/images/gents_kurta_shalwar_1791770727089.jpg',
    itemCount: 12,
  },
  {
    id: 'casual-wear-gents',
    name: 'Casual Wear',
    gender: 'gents',
    description: 'Everyday comfortable short kurtas and soft spun cotton shirts for relaxed elegance.',
    image: '/src/assets/images/mens_cotton_kurta_1791770830065.jpg',
    itemCount: 10,
  },
  {
    id: 'formal-wear-gents',
    name: 'Formal Wear',
    gender: 'gents',
    description: 'Prestigious sherwanis, prince coats, and structured celebratory ensembles.',
    image: '/src/assets/images/gents_waistcoat_suit_1791770756076.jpg',
    itemCount: 7,
  },
  {
    id: 'waistcoats',
    name: 'Waistcoats',
    gender: 'gents',
    description: 'Tailored raw silk, suiting, and jacquard waistcoats that elevate traditional attire.',
    image: '/src/assets/images/gents_waistcoat_suit_1791770756076.jpg',
    itemCount: 9,
  },
  {
    id: 'winter-collection-gents',
    name: 'Winter Collection',
    gender: 'gents',
    description: 'Heavy winter Khaddar, blended wool suits, and Kashmiri embroidered shawls.',
    image: '/src/assets/images/mens_wool_shawl_1791770803872.jpg',
    itemCount: 11,
  },
];
