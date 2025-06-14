export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  description: string;
  image: string;
  images: string[];
  category: 'gundam' | 'figure' | 'accessories' | 'tools';
  subcategory?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  scale?: string;
  series?: string;
  manufacturer?: string;
  releaseDate?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  modelUrl?: string;
  hasModel3D: boolean;
  specifications: {
    height?: string;
    weight?: string;
    articulation?: string;
    accessories?: string[];
  };
  tags: string[];
  priceRange: 'budget' | 'standard' | 'premium' | 'luxury';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  loginMethod?: 'email' | 'username';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
}

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
  description?: string;
  applicableCategories?: string[];
}

export interface FilterOptions {
  category: string;
  subcategory: string;
  priceRange: string;
  manufacturer: string;
  difficulty: string;
  series: string;
  tags: string[];
  inStock: boolean;
  hasModel3D: boolean;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price' | 'rating' | 'newest' | 'popular';
  sortOrder: 'asc' | 'desc';
}

export interface TrackingInfo {
  trackingNumber: string;
  status: 'ordered' | 'processing' | 'shipped' | 'in-transit' | 'out-for-delivery' | 'delivered';
  estimatedDelivery: Date;
  currentLocation: string;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  timestamp: Date;
  status: string;
  location: string;
  description: string;
}

export interface CustomService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'painting' | 'assembly' | 'customization' | 'repair';
  duration: string;
  features: string[];
}