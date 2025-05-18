export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviews: Review[];
  variants?: ProductVariant[];
  featured?: boolean;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: {
    [key: string]: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  orders: Order[];
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parentId?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface SiteConfig {
  siteName: string;
  logo: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  languages: string[];
  defaultLanguage: string;
  contactInfo: ContactInfo;
  paymentMethods: {
    stripe: boolean;
    paypal: boolean;
    applePay: boolean;
    googlePay: boolean;
  };
}