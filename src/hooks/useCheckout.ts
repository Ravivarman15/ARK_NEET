import { useState, useCallback } from 'react';
import { Product, PRODUCTS } from '@/config/products';

export function useCheckout() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCheckout = useCallback((productId: string) => {
    const product = PRODUCTS[productId];
    if (product) {
      setSelectedProduct(product);
      setIsOpen(true);
    }
  }, []);

  const closeCheckout = useCallback(() => {
    setIsOpen(false);
    setSelectedProduct(null);
  }, []);

  return { isOpen, selectedProduct, openCheckout, closeCheckout };
}
