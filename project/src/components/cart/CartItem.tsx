import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { Product } from '../../types';
import useCartStore from '../../store/cartStore';
import useConfigStore from '../../store/configStore';

interface CartItemProps {
  item: CartItemType;
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item, product }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { language } = useConfigStore();
  
  const price = product.salePrice || product.price;
  const totalPrice = price * item.quantity;
  
  const handleIncreaseQuantity = () => {
    if (item.quantity < product.stock) {
      updateQuantity(item.productId, item.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };
  
  const handleRemoveItem = () => {
    removeItem(item.productId);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        
        {/* Variants if available */}
        {item.variant && Object.keys(item.variant).length > 0 && (
          <div className="mt-1 text-xs text-gray-500">
            {Object.entries(item.variant).map(([key, value]) => (
              <span key={key} className="mr-2">
                {key}: {value}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-1 flex items-center justify-between">
          {/* Price */}
          <div>
            <span className="text-sm font-medium text-gray-900">
              ${price.toFixed(2)}
            </span>
            {product.salePrice && (
              <span className="ml-2 text-xs text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded">
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-primary disabled:opacity-50"
              onClick={handleDecreaseQuantity}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            
            <span className="px-2 py-1 text-sm text-gray-700 select-none">
              {item.quantity}
            </span>
            
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-primary disabled:opacity-50"
              onClick={handleIncreaseQuantity}
              disabled={item.quantity >= product.stock}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Total Price and Remove */}
      <div className="ml-4 flex flex-col items-end">
        <span className="text-sm font-medium text-gray-900">
          ${totalPrice.toFixed(2)}
        </span>
        
        <button
          type="button"
          className="mt-1 text-sm text-red-500 hover:text-red-700"
          onClick={handleRemoveItem}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;