export type SlotCategory = 'head' | 'face' | 'top' | 'bottom' | 'feet' | 'accessory';

export interface SlotOffset {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export type GeometryType = 
  | 'tshirt' 
  | 'hoodie' 
  | 'jacket' 
  | 'blazer'
  | 'shirt'
  | 'croptop'
  | 'cardigan'
  | 'jeans' 
  | 'cargopants' 
  | 'shorts' 
  | 'skirt'
  | 'sneakers' 
  | 'boots' 
  | 'loafers'
  | 'maryjane'
  | 'cap' 
  | 'beanie' 
  | 'buckethat' 
  | 'beret'
  | 'headphones'
  | 'glasses' 
  | 'sunglasses'
  | 'mask'
  | 'bag' 
  | 'necklace' 
  | 'watch';

export interface ModelData {
  modelUrl?: string; // Optional .glb path
  type: 'glb' | 'procedural';
  color: string;
  secondaryColor?: string;
  roughness?: number;
  metalness?: number;
  offset: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  geometryType?: GeometryType;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: SlotCategory;
  price: number;
  originalPrice?: number;
  brand: string;
  affiliateUrl: string;
  merchantName: string;
  thumbnail: string;
  description: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  colors: string[];
  material: string;
  inStock: boolean;
  styleTag: string; // 'Streetwear' | 'Minimalist' | 'Vintage' | 'Office' | 'Y2K' | 'Sporty'
  gender: 'male' | 'female' | 'unisex';
  modelData: ModelData;
}

export interface EquippedItems {
  head?: ClothingItem;
  face?: ClothingItem;
  top?: ClothingItem;
  bottom?: ClothingItem;
  feet?: ClothingItem;
  accessory?: ClothingItem;
}

export interface StylePreset {
  id: string;
  name: string;
  vietnameseName: string;
  tagline: string;
  description: string;
  coverImage: string;
  itemIds: string[];
  tags: string[];
  colorPalette: string[];
}

export interface SavedOutfit {
  id: string;
  name: string;
  createdAt: string;
  equippedItems: EquippedItems;
  totalPrice: number;
  thumbnail?: string;
  notes?: string;
}

export interface AffiliateClickRecord {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  price: number;
  merchantName: string;
  timestamp: number;
  source: 'fitting_page' | 'style_gallery' | 'product_detail' | 'ai_recommendation' | 'saved_outfit';
}

export interface AIDetectedItem {
  name: string;
  category: SlotCategory;
  color: string;
  estimatedStyle: string;
  confidence: number;
}

export interface AIAnalysisResult {
  detectedItems: AIDetectedItem[];
  dominantStyle: string;
  overallScore: number;
  critique: string;
  stylingTips: string[];
  recommendedProductIds: string[];
}
