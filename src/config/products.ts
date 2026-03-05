// Frontend product reference — prices are for DISPLAY ONLY.
// Backend is the source of truth for actual pricing and delivery links.

export interface Product {
  product_id: string;
  product_name: string;
  display_price: number; // For UI display only, backend validates actual price
  type: 'single' | 'bundle';
}

export const PRODUCTS: Record<string, Product> = {
  'core-100': {
    product_id: 'core-100',
    product_name: 'CORE 100',
    display_price: 1499,
    type: 'single',
  },
  'bio-360': {
    product_id: 'bio-360',
    product_name: 'BIOLOGY 360 LOCK™',
    display_price: 1999,
    type: 'single',
  },
  'ncert-line': {
    product_id: 'ncert-line',
    product_name: 'NCERT LINE-BY-LINE',
    display_price: 1299,
    type: 'single',
  },
  'pyq-forecaster': {
    product_id: 'pyq-forecaster',
    product_name: 'PYQ PATTERN',
    display_price: 999,
    type: 'single',
  },
  'trap-bank': {
    product_id: 'trap-bank',
    product_name: 'TRAP & CONFUSION',
    display_price: 699,
    type: 'single',
  },
  'high-weight': {
    product_id: 'high-weight',
    product_name: 'HIGH WEIGHT',
    display_price: 899,
    type: 'single',
  },
  'bundle-biology-master': {
    product_id: 'bundle-biology-master',
    product_name: 'BIOLOGY MASTER BUNDLE',
    display_price: 3499,
    type: 'bundle',
  },
  'bundle-400-foundation': {
    product_id: 'bundle-400-foundation',
    product_name: '400+ FOUNDATION BUNDLE',
    display_price: 2999,
    type: 'bundle',
  },
  'bundle-full-rank-booster': {
    product_id: 'bundle-full-rank-booster',
    product_name: 'FULL RANK BOOSTER',
    display_price: 4999,
    type: 'bundle',
  },
};
