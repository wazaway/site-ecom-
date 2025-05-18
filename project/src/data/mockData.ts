import { Product, Category, SiteConfig, User, ContactInfo } from '../types';

export const mockContactInfo: ContactInfo = {
  address: 'Rue Al Karama, Bekalta, Monastir, Tunisia',
  phone: '+216 99 665 663 / +216 56 111 799',
  email: 'wajdi.benzayene@gmail.com',
  socialMedia: {
    facebook: 'https://facebook.com/wazwaydrop',
    instagram: 'https://instagram.com/wazwaydrop',
    twitter: 'https://twitter.com/wazwaydrop'
  }
};

export const mockCategories: Category[] = [
  { id: '1', name: 'Vêtements', slug: 'vetements', image: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg' },
  { id: '2', name: 'Électronique', slug: 'electronique', image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg' },
  { id: '3', name: 'Maison', slug: 'maison', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg' },
  { id: '4', name: 'Sport', slug: 'sport', image: 'https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg' },
  { id: '5', name: 'Beauté', slug: 'beaute', image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'T-shirt Premium',
    description: 'T-shirt en coton biologique de haute qualité, confortable et durable.',
    price: 29.99,
    salePrice: 24.99,
    images: [
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      'https://images.pexels.com/photos/5698858/pexels-photo-5698858.jpeg',
    ],
    category: '1',
    stock: 100,
    rating: 4.5,
    reviews: [
      {
        id: '101',
        userId: '1',
        userName: 'Jean Dupont',
        rating: 5,
        comment: 'Excellent t-shirt, très confortable !',
        createdAt: '2023-11-15T14:30:00Z',
      },
      {
        id: '102',
        userId: '2',
        userName: 'Marie Dubois',
        rating: 4,
        comment: 'Bonne qualité, mais un peu grand pour sa taille.',
        createdAt: '2023-11-10T09:15:00Z',
      },
    ],
    variants: [
      {
        id: 'v1',
        name: 'Taille',
        options: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'v2',
        name: 'Couleur',
        options: ['Noir', 'Blanc', 'Bleu', 'Rouge'],
      },
    ],
    featured: true,
    createdAt: '2023-10-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Smartphone XL Pro',
    description: 'Le dernier smartphone avec un écran OLED, un processeur ultra-rapide et un appareil photo de 108MP.',
    price: 899.99,
    images: [
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    ],
    category: '2',
    stock: 50,
    rating: 4.8,
    reviews: [
      {
        id: '201',
        userId: '3',
        userName: 'Pierre Martin',
        rating: 5,
        comment: 'Meilleur téléphone que j\'ai jamais eu !',
        createdAt: '2023-11-20T16:45:00Z',
      },
    ],
    variants: [
      {
        id: 'v1',
        name: 'Stockage',
        options: ['128GB', '256GB', '512GB'],
      },
      {
        id: 'v2',
        name: 'Couleur',
        options: ['Noir', 'Argent', 'Or'],
      },
    ],
    featured: true,
    createdAt: '2023-10-05T00:00:00Z',
  },
  {
    id: '3',
    name: 'Lampe Design',
    description: 'Lampe moderne avec un design minimaliste, parfaite pour votre salon ou bureau.',
    price: 89.99,
    salePrice: 69.99,
    images: [
      'https://images.pexels.com/photos/943150/pexels-photo-943150.jpeg',
      'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg',
    ],
    category: '3',
    stock: 30,
    rating: 4.3,
    reviews: [
      {
        id: '301',
        userId: '2',
        userName: 'Marie Dubois',
        rating: 4,
        comment: 'Belle lampe, donne une ambiance chaleureuse.',
        createdAt: '2023-11-12T10:20:00Z',
      },
    ],
    variants: [
      {
        id: 'v1',
        name: 'Couleur',
        options: ['Noir', 'Blanc', 'Bois'],
      },
    ],
    createdAt: '2023-10-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'Tapis de Yoga Premium',
    description: 'Tapis de yoga antidérapant, écologique et confortable pour vos séances.',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg',
      'https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg',
    ],
    category: '4',
    stock: 80,
    rating: 4.7,
    reviews: [
      {
        id: '401',
        userId: '1',
        userName: 'Jean Dupont',
        rating: 5,
        comment: 'Excellent tapis, très confortable et adhérent !',
        createdAt: '2023-11-18T08:10:00Z',
      },
    ],
    variants: [
      {
        id: 'v1',
        name: 'Couleur',
        options: ['Bleu', 'Violet', 'Vert', 'Rouge'],
      },
      {
        id: 'v2',
        name: 'Épaisseur',
        options: ['4mm', '6mm', '8mm'],
      },
    ],
    createdAt: '2023-10-15T00:00:00Z',
  },
  {
    id: '5',
    name: 'Kit de Soins Visage',
    description: 'Ensemble complet de produits de soins pour le visage, naturels et bio.',
    price: 79.99,
    salePrice: 59.99,
    images: [
      'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg',
      'https://images.pexels.com/photos/6621357/pexels-photo-6621357.jpeg',
    ],
    category: '5',
    stock: 40,
    rating: 4.6,
    reviews: [
      {
        id: '501',
        userId: '3',
        userName: 'Pierre Martin',
        rating: 5,
        comment: 'Des produits de qualité, ma peau est transformée !',
        createdAt: '2023-11-22T12:30:00Z',
      },
      {
        id: '502',
        userId: '2',
        userName: 'Marie Dubois',
        rating: 4,
        comment: 'Très bons produits, mais l\'emballage pourrait être amélioré.',
        createdAt: '2023-11-19T18:45:00Z',
      },
    ],
    featured: true,
    createdAt: '2023-10-20T00:00:00Z',
  },
];

export const mockSiteConfig: SiteConfig = {
  siteName: 'WaZWay Drop',
  logo: '/logo.svg',
  theme: {
    primaryColor: '#FFD700',
    secondaryColor: '#000000',
    accentColor: '#FF6B6B',
  },
  languages: ['fr', 'en'],
  defaultLanguage: 'fr',
  contactInfo: mockContactInfo,
  paymentMethods: {
    stripe: true,
    paypal: true,
    applePay: false,
    googlePay: false
  }
};

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'wajdi.benzayene@gmail.com',
    name: 'Admin',
    role: 'admin',
    orders: [],
    createdAt: '2023-09-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Utilisateur Test',
    role: 'user',
    orders: [],
    createdAt: '2023-10-15T00:00:00Z',
  },
];