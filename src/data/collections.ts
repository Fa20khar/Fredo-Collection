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
    id: 'winter-warmth',
    title: 'Gents Wool Shadar & Winter Warmth',
    subtitle: 'Handcrafted Wool Shawls',
    description: 'Authentic pure lambswool gents shadar with fringe borders, Kamalia khaddar, and velvet wraps.',
    image: '/images/gents_wool_shadar.jpg',
    genderFilter: 'all',
  },
  {
    id: 'elegant-embroidery',
    title: 'Bin Saeed Dhanak Collection',
    subtitle: 'Heritage Velvet & Needlework',
    description: 'Vol-213 dyed Dhanak full embroidered suits paired with luxurious Velvet Palachi shawls.',
    image: '/images/ladies_bin_saeed.jpg',
    categoryFilter: 'embroidered-suits',
    genderFilter: 'ladies',
  },
  {
    id: 'classic-mens-wear',
    title: 'J. Asli Sona Menswear',
    subtitle: 'Dignified Sophistication',
    description: 'Authentic textured horizontal-weave kurta shalwar suits tailored for Pakistani gentlemen.',
    image: '/images/gents_asli_sona.jpg',
    categoryFilter: 'kurta-shalwar',
    genderFilter: 'gents',
  },
  {
    id: 'everyday-essentials',
    title: 'Mother Care 3-Piece Dhanak',
    subtitle: 'Comfort Meets Style',
    description: 'Allover printed Dhanak shirts, coordinating trousers, and plush matching printed dupattas.',
    image: '/images/ladies_mother_care.jpg',
    genderFilter: 'ladies',
  },
  {
    id: 'festive-collection',
    title: 'Festive & Embroidered Attire',
    subtitle: 'Celebrations & Weddings',
    description: 'Opulent Palachi shawls, zardozi trims, and rich occasion wear designed to turn heads.',
    image: '/images/ladies_embroidered.jpg',
    genderFilter: 'ladies',
  },
  {
    id: 'new-season-arrivals',
    title: 'Artisanal Printed Textiles',
    subtitle: 'Chunri & Botanical Florals',
    description: 'Vibrant sunflower botanicals, antique teal roses, and traditional geometric chunri patterns.',
    image: '/images/ladies_unstitched_textiles.jpg',
    genderFilter: 'all',
  },
];
