import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import useCartStore from '../../store/cartStore';
import useConfigStore from '../../store/configStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { language } = useConfigStore();
  
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
    });
  };
  
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;
  
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Discount Tag */}
        {product.salePrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between">
          <button
            className="bg-white rounded-full p-2 hover:bg-primary hover:text-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={16} />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white rounded-full px-3 py-1 text-xs flex items-center hover:bg-primary-dark transition-colors"
          >
            <ShoppingCart size={14} className="mr-1" />
            {language === 'fr' ? 'Ajouter' : 'Add to Cart'}
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-gray-800 font-medium text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          {/* Star Rating */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : i < product.rating
                    ? 'text-yellow-300'
                    : 'text-gray-300'
                } fill-current`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-2">({product.reviews.length})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="text-gray-400 line-through text-sm mr-2">${product.price.toFixed(2)}</span>
                <span className="text-primary font-semibold">${product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {product.stock < 10 && product.stock > 0 ? (
            <span className="text-orange-500 text-xs">
              {language === 'fr' ? 'Stock limité' : 'Low stock'}
            </span>
          ) : product.stock === 0 ? (
            <span className="text-red-500 text-xs">
              {language === 'fr' ? 'Épuisé' : 'Out of stock'}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;