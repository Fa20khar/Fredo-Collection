import React from 'react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  emptyMessage = 'No products found.',
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-neutral-500">
        <p className="text-base font-medium text-neutral-800">{emptyMessage}</p>
        <p className="text-xs text-neutral-500 mt-1">Try adjusting your filters or search keywords.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
