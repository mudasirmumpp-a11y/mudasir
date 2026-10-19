export type ProductCategory =
  | 'Decorative Vases'
  | 'Wall Art & Wall Hangings'
  | 'Decorative Lamps'
  | 'Sculptures & Showpieces'
  | 'Artificial Flowers & Plants'
  | 'Decorative Trays'
  | 'Mirrors & Wall Decor'
  | 'Candles & Candle Holders'
  | 'Table Decor'
  | 'Gift Items';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecifications {
  material: string;
  dimensions: string;
  weight: string;
  care: string;
  origin: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  pricePKR: number;
  originalPricePKR?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  image: string;
  secondaryImages: string[];
  specifications: ProductSpecifications;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // product.id + '-' + color + '-' + size
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerDetails;
  paymentMethod: 'cod' | 'bank_transfer';
  createdAt: string;
  status: 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered';
}

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedColor: string;
  minRating: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}
