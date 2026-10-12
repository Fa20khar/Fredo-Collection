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
    image: '/src/assets/images/ladies_embroidered_suit_1791770714880.jpg',
    categoryFilter: 'embroidered-suits',
    genderFilter: 'ladies',
  },
  {
    id: 'classic-mens-wear',
    title: 'Classic Men\'s Wear',
    subtitle: 'Dignified Sophistication',
    description: 'Impeccably tailored Kurta Shalwar suits and waistcoats for the modern Pakistani gentleman.',
    image: '/src/assets/images/gents_kurta_shalwar_1791770727089.jpg',
    categoryFilter: 'kurta-shalwar',
    genderFilter: 'gents',
  },
  {
    id: 'festive-collection',
    title: 'Festive Collection',
    subtitle: 'Celebrations & Weddings',
    description: 'Opulent color palettes, gold tilla trims, and bespoke party wear designed to turn heads.',
    image: '/src/assets/images/hero_editorial_pakistani_1791770700977.jpg',
    genderFilter: 'ladies',
  },
  {
    id: 'winter-warmth',
    title: 'Winter Warmth',
    subtitle: 'Seasonal Wool & Khaddar',
    description: 'Luxurious Pashmina shawls, Palachi velvet wraps, and warm winter Khaddar fabrics.',
    image: '/src/assets/images/mens_wool_shawl_1791770803872.jpg',
    genderFilter: 'all',
  },
  {
    id: 'everyday-essentials',
    title: 'Everyday Essentials',
    subtitle: 'Comfort Meets Style',
    description: 'Breezy lawn suits, daily casual kurtas, and easy-care fabrics for effortless style.',
    image: '/src/assets/images/ladies_printed_lawn_1791770740917.jpg',
    genderFilter: 'all',
  },
  {
    id: 'new-season-arrivals',
    title: 'New Season Arrivals',
    subtitle: 'Fresh Off The Loom',
    description: 'The latest drops inspired by modern runway trends and enduring cultural roots.',
    image: '/src/assets/images/gents_waistcoat_suit_1791770756076.jpg',
    genderFilter: 'all',
  },
];
