// ============================================
// Product Catalog — SERVER-SIDE SOURCE OF TRUTH
// Price is in INR (rupees). Razorpay needs paise.
// delivery_link is the actual file/access URL.
// ============================================

const PRODUCTS = {
  'core-100': {
    product_id: 'core-100',
    product_name: 'CORE 100',
    price: 1499,        // INR
    delivery_link: 'https://drive.google.com/file/d/1G0vg94YNdZ-7VY86IbELfcFd0BhS4Mow/preview',
  },
  'bio-360': {
    product_id: 'bio-360',
    product_name: 'BIOLOGY 360 LOCK™',
    price: 1999,
    delivery_link: 'https://drive.google.com/file/d/1eQler5_g1tpN5DEAdZTF1dY3m6F2Drb6/preview',
  },
  'ncert-line': {
    product_id: 'ncert-line',
    product_name: 'NCERT LINE-BY-LINE',
    price: 1299,
    delivery_link: 'https://drive.google.com/file/d/1EjoK_x1DvETnCNHkhnK6NQSFDwwTSN7K/preview',
  },
  'pyq-forecaster': {
    product_id: 'pyq-forecaster',
    product_name: 'PYQ PATTERN',
    price: 999,
    delivery_link: 'https://drive.google.com/file/d/1909Qz3VmmADkT3NMk-8x3779fUHvL-vU/preview',
  },
  'trap-bank': {
    product_id: 'trap-bank',
    product_name: 'TRAP & CONFUSION',
    price: 699,
    delivery_link: 'https://drive.google.com/file/d/1yMT61NPvC3k9X8JxLf7zM8mPrwN2rD-y/preview',
  },
  'high-weight': {
    product_id: 'high-weight',
    product_name: 'HIGH WEIGHT',
    price: 899,
    delivery_link: 'https://drive.google.com/file/d/1aba9r8FxZzJ7Bk8EJIML4mCOdLfRxFCz/preview',
  },
  'bundle-biology-master': {
    product_id: 'bundle-biology-master',
    product_name: 'BIOLOGY MASTER BUNDLE',
    price: 3499,
    delivery_link: 'https://drive.google.com/drive/folders/1c1ZY15pKKdSWYwvUgtXVC9xPVUnU6w2S?usp=sharing',
  },
  'bundle-400-foundation': {
    product_id: 'bundle-400-foundation',
    product_name: '400+ FOUNDATION BUNDLE',
    price: 2999,
    delivery_link: 'https://drive.google.com/drive/folders/1c1ZY15pKKdSWYwvUgtXVC9xPVUnU6w2S?usp=sharing',
  },
  'bundle-full-rank-booster': {
    product_id: 'bundle-full-rank-booster',
    product_name: 'FULL RANK BOOSTER',
    price: 4999,
    delivery_link: 'https://drive.google.com/drive/folders/1c1ZY15pKKdSWYwvUgtXVC9xPVUnU6w2S?usp=sharing',
  },
};

export default PRODUCTS;
