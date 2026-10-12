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
    description: 'Authentic Mother Care & Essa Collection 3-piece Dhanak and Lawn unstitched fabrics.',
    image: '/images/ladies_mother_care.jpg',
    itemCount: 14,
  },
  {
    id: 'embroidered-suits',
    name: 'Embroidered Suits',
    gender: 'ladies',
    description: 'Bin Saeed Vol-213 dyed Dhanak suits with resham embroidery and velvet Palachi shawls.',
    image: '/images/ladies_bin_saeed.jpg',
    itemCount: 18,
  },
  {
    id: 'ready-to-wear-ladies',
    name: 'Ready-to-Wear',
    gender: 'ladies',
    description: 'Stitched to perfection with flattering silhouettes and refined Pakistani cuts.',
    image: '/images/ladies_bin_saeed.jpg',
    itemCount: 10,
  },
  {
    id: 'casual-wear-ladies',
    name: 'Casual Wear',
    gender: 'ladies',
    description: 'Comfortable printed kurtis and unstitched textiles in rich botanical and chunri motifs.',
    image: '/images/ladies_unstitched_textiles.jpg',
    itemCount: 12,
  },
  {
    id: 'formal-wear-ladies',
    name: 'Formal Wear',
    gender: 'ladies',
    description: 'Festive celebratory ensembles with embroidered necklines and velvet Palachi wraps.',
    image: '/images/ladies_bin_saeed.jpg',
    itemCount: 8,
  },
  {
    id: 'shawls-and-dupattas',
    name: 'Shawls and Dupattas',
    gender: 'ladies',
    description: 'Opulent Palachi velvet shawls and digital printed Dhanak dupattas.',
    image: '/images/ladies_bin_saeed.jpg',
    itemCount: 16,
  },

  // Gents
  {
    id: 'kurta-shalwar',
    name: 'Kurta Shalwar',
    gender: 'gents',
    description: 'Authentic J. Asli Sona textured kurta shalwar suits with mandarin band collar.',
    image: '/images/gents_asli_sona.jpg',
    itemCount: 16,
  },
  {
    id: 'mens-unstitched-fabric',
    name: "Men's Unstitched Fabric",
    gender: 'gents',
    description: 'Premium Wash & Wear and Kamalia Khaddar 4.5 meter unstitched suit lengths.',
    image: '/images/gents_kurta.jpg',
    itemCount: 12,
  },
  {
    id: 'casual-wear-gents',
    name: 'Casual Wear',
    gender: 'gents',
    description: 'Everyday textured combed cotton kurtas for effortless dignity and style.',
    image: '/images/gents_asli_sona.jpg',
    itemCount: 10,
  },
  {
    id: 'formal-wear-gents',
    name: 'Formal Wear',
    gender: 'gents',
    description: 'Structured celebratory ensembles, tailored waistcoats, and signature suits.',
    image: '/images/gents_waistcoat.jpg',
    itemCount: 7,
  },
  {
    id: 'waistcoats',
    name: 'Waistcoats',
    gender: 'gents',
    description: 'Tailored raw silk and textured waistcoats designed to pair over kurta shalwar.',
    image: '/images/gents_waistcoat.jpg',
    itemCount: 9,
  },
  {
    id: 'winter-collection-gents',
    name: 'Winter Collection & Shadar',
    gender: 'gents',
    description: 'Handcrafted pure lambswool gents shadar (chadar shawls) with geometric borders & fringe.',
    image: '/images/gents_wool_shadar.jpg',
    itemCount: 11,
  },
];
