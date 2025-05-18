import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import useCartStore from '../store/cartStore';
import { mockProducts } from '../data/mockData';
import useConfigStore from '../store/configStore';

const Cart: React.FC = () => {
  const { items, clearCart, getTotal } = useCartStore();
  const { language } = useConfigStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const cartProducts = items.map((item) => {
    const product = mockProducts.find((p) => p.id === item.productId);
    return { item, product };
  }).filter((item) => item.product !== undefined);
  
  const subtotal = getTotal(mockProducts);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  if (items.length === 0) {
    return (
      <div className="bg-white pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold mb-4">
            {language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'fr'
              ? 'Il semble que vous n\'ayez pas encore ajouté d\'articles à votre panier.'
              : 'Looks like you haven\'t added any items to your cart yet.'}
          </p>
          <Link to="/products">
            <Button variant="primary">
              {language === 'fr' ? 'Continuer vos achats' : 'Continue Shopping'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'fr' ? 'Votre Panier' : 'Your Cart'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {language === 'fr' ? 'Articles du panier' : 'Cart Items'} ({items.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  {language === 'fr' ? 'Vider le panier' : 'Clear Cart'}
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartProducts.map(({ item, product }) => (
                  product && <CartItem key={item.productId} item={item} product={product} />
                ))}
              </div>
              
              <div className="mt-6">
                <Link to="/products">
                  <Button variant="outline" leftIcon={<ArrowRight size={18} className="rotate-180" />}>
                    {language === 'fr' ? 'Continuer vos achats' : 'Continue Shopping'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'fr' ? 'Résumé de la commande' : 'Order Summary'}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Sous-total' : 'Subtotal'}
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Frais de livraison' : 'Shipping'}
                  </span>
                  {shipping === 0 ? (
                    <span className="text-green-600">
                      {language === 'fr' ? 'Gratuit' : 'Free'}
                    </span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Taxes estimées' : 'Estimated Tax'}
                  </span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
                  <span>
                    {language === 'fr' ? 'Total' : 'Total'}
                  </span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button variant="primary" fullWidth>
                  {language === 'fr' ? 'Passer à la caisse' : 'Proceed to Checkout'}
                </Button>
              </Link>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 text-center">
                  {language === 'fr'
                    ? 'Nous acceptons les paiements par carte de crédit, PayPal et Apple Pay.'
                    : 'We accept credit card payments, PayPal, and Apple Pay.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;