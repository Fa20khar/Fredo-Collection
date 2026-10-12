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
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    itemCount: 14,
  },
  {
    id: 'embroidered-suits',
    name: 'Embroidered Suits',
    gender: 'ladies',
    description: 'Intricate thread embroidery and gold tilla work on luxury seasonal fabrics.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
  },
  {
    id: 'ready-to-wear-ladies',
    name: 'Ready-to-Wear',
    gender: 'ladies',
    description: 'Stitched to perfection with flattering silhouettes and refined Pakistani cuts.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    itemCount: 10,
  },
  {
    id: 'casual-wear-ladies',
    name: 'Casual Wear',
    gender: 'ladies',
    description: 'Comfortable printed kurtis and lightweight breathable summer-winter cottons.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    itemCount: 12,
  },
  {
    id: 'formal-wear-ladies',
    name: 'Formal Wear',
    gender: 'ladies',
    description: 'Festive occasion wear with hand embellishments, sequins, and organza dupattas.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
  },
  {
    id: 'shawls-and-dupattas',
    name: 'Shawls and Dupattas',
    gender: 'ladies',
    description: 'Opulent Palachi velvet shawls, Pashmina wraps, and embroidered borders.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
  },

  // Gents
  {
    id: 'kurta-shalwar',
    name: 'Kurta Shalwar',
    gender: 'gents',
    description: 'Timeless traditional suits in classic Pakistani silhouettes with band collar details.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
  },
  {
    id: 'mens-unstitched-fabric',
    name: 'Men\'s Unstitched Fabric',
    gender: 'gents',
    description: 'Export-quality Latha, Boski, Wash & Wear, and pure Egyptian cotton fabric lengths.',
    image: 'https://images.unsplash.com/photo-1626307416562-ee839676f5fc?auto=format&fit=crop&w=800&q=80',
    itemCount: 12,
  },
  {
    id: 'casual-wear-gents',
    name: 'Casual Wear',
    gender: 'gents',
    description: 'Everyday comfortable short kurtas and soft spun cotton shirts for relaxed elegance.',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80',
    itemCount: 10,
  },
  {
    id: 'formal-wear-gents',
    name: 'Formal Wear',
    gender: 'gents',
    description: 'Prestigious sherwanis, prince coats, and structured celebratory ensembles.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    itemCount: 7,
  },
  {
    id: 'waistcoats',
    name: 'Waistcoats',
    gender: 'gents',
    description: 'Tailored raw silk, suiting, and jacquard waistcoats that elevate traditional attire.',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
    itemCount: 9,
  },
  {
    id: 'winter-collection-gents',
    name: 'Winter Collection',
    gender: 'gents',
    description: 'Heavy winter Khaddar, blended wool suits, and Kashmiri embroidered shawls.',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
    itemCount: 11,
  },
];
