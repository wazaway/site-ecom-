import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';
import useConfigStore from '../../store/configStore';

interface ProductGridProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  emptyMessage 
}) => {
  const { language } = useConfigStore();
  
  const defaultEmptyMessage = language === 'fr' 
    ? 'Aucun produit trouvé' 
    : 'No products found';
  
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-16 text-gray-500">
          <p>{emptyMessage || defaultEmptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;