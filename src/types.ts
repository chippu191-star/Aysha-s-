import { Product } from "./data.js";

export interface CustomMeasurements {
  bust: number;
  waist: number;
  hips: number;
  heightValue: number; // e.g. 165 for cm
  heightCategory: 'petite' | 'regular' | 'tall';
  shoulder: number;
}

export interface StylingRequest {
  occasion: string;
  preferredStyle: string;
  bodyShape: string;
  height: 'petite' | 'regular' | 'tall';
  colorPalette: string;
  selectedCategory: string;
}

export interface StylistLookbook {
  stylingAdvice: string;
  productRecommendation: {
    productId: string;
    productName: string;
    reasoning: string;
  };
  customTailoringRules: {
    optimalLength: string;
    collarSuggestion: string;
    sleeveStyling: string;
    bodiceAlteration: string;
  };
  accessorizingChecklist: string[];
}

export interface CartItem {
  id: string; // unique item id inside cart
  product: Product;
  measurementsSnapshot: CustomMeasurements;
  bespokeSizeCode: string;
  customNotes: string;
  lookbookApplied?: boolean;
  lookbookCustomizations?: {
    length: string;
    collar: string;
    sleeves: string;
    alt: string;
  };
}
