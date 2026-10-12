export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  categoryFilter?: string;
  genderFilter?: 'ladies' | 'gents' | 'all';
}

export const collections: CollectionItem[] = [
  {
    id: 'elegant-embroidery',
    title: 'Elegant Embroidery',
    subtitle: 'Heritage Needlework',
    description: 'Intricately embroidered Dhanak and chiffon ensembles with artisanal thread details.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    categoryFilter: 'embroidered-suits',
    genderFilter: 'ladies',
  },
  {
    id: 'classic-mens-wear',
    title: 'Classic Men\'s Wear',
    subtitle: 'Dignified Sophistication',
    description: 'Impeccably tailored Kurta Shalwar suits and waistcoats for the modern Pakistani gentleman.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    categoryFilter: 'kurta-shalwar',
    genderFilter: 'gents',
  },
  {
    id: 'festive-collection',
    title: 'Festive Collection',
    subtitle: 'Celebrations & Weddings',
    description: 'Opulent color palettes, gold tilla trims, and bespoke party wear designed to turn heads.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    genderFilter: 'ladies',
  },
  {
    id: 'winter-warmth',
    title: 'Winter Warmth',
    subtitle: 'Seasonal Wool & Khaddar',
    description: 'Luxurious Pashmina shawls, Palachi velvet wraps, and warm winter Khaddar fabrics.',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
    genderFilter: 'all',
  },
  {
    id: 'everyday-essentials',
    title: 'Everyday Essentials',
    subtitle: 'Comfort Meets Style',
    description: 'Breezy lawn suits, daily casual kurtas, and easy-care fabrics for effortless style.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    genderFilter: 'all',
  },
  {
    id: 'new-season-arrivals',
    title: 'New Season Arrivals',
    subtitle: 'Fresh Off The Loom',
    description: 'The latest drops inspired by modern runway trends and enduring cultural roots.',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
    genderFilter: 'all',
  },
];
