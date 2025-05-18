import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useCartStore from '../store/cartStore';
import useConfigStore from '../store/configStore';
import { mockProducts } from '../data/mockData';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { language } = useConfigStore();
  
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  const subtotal = getTotal(mockProducts);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate('/order-confirmation');
      setIsLoading(false);
    }, 2000);
  };
  
  const getStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {language === 'fr' ? 'Informations de contact' : 'Contact Information'}
            </h2>
            
            <div className="space-y-4">
              <Input
                label={language === 'fr' ? 'Adresse e-mail' : 'Email Address'}
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={language === 'fr' ? 'Prénom' : 'First Name'}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  required
                />
                
                <Input
                  label={language === 'fr' ? 'Nom' : 'Last Name'}
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  required
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button
                variant="primary"
                onClick={() => setActiveStep(2)}
                disabled={!email || !firstName || !lastName}
              >
                {language === 'fr' ? 'Continuer' : 'Continue'}
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {language === 'fr' ? 'Adresse de livraison' : 'Shipping Address'}
            </h2>
            
            <div className="space-y-4">
              <Input
                label={language === 'fr' ? 'Adresse' : 'Address'}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={language === 'fr' ? 'Ville' : 'City'}
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  required
                />
                
                <Input
                  label={language === 'fr' ? 'Code postal' : 'Zip Code'}
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  fullWidth
                  required
                />
              </div>
              
              <Input
                label={language === 'fr' ? 'Pays' : 'Country'}
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
                required
              />
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setActiveStep(1)}>
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              
              <Button
                variant="primary"
                onClick={() => setActiveStep(3)}
                disabled={!address || !city || !zipCode || !country}
              >
                {language === 'fr' ? 'Continuer' : 'Continue'}
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {language === 'fr' ? 'Méthode de paiement' : 'Payment Method'}
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => setPaymentMethod('credit_card')}
                    className="mr-2"
                  />
                  <CreditCard className="mr-2 text-gray-600" size={20} />
                  <span>
                    {language === 'fr' ? 'Carte de crédit' : 'Credit Card'}
                  </span>
                </label>
                
                {paymentMethod === 'credit_card' && (
                  <div className="mt-4 pl-6">
                    <div className="space-y-4">
                      <Input
                        label={language === 'fr' ? 'Numéro de carte' : 'Card Number'}
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        fullWidth
                        required
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label={language === 'fr' ? 'Date d\'expiration' : 'Expiration Date'}
                          type="text"
                          placeholder="MM/YY"
                          fullWidth
                          required
                        />
                        
                        <Input
                          label="CVV"
                          type="text"
                          placeholder="123"
                          fullWidth
                          required
                        />
                      </div>
                      
                      <Input
                        label={language === 'fr' ? 'Nom sur la carte' : 'Name on Card'}
                        type="text"
                        fullWidth
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <label className="flex items-center opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    disabled
                    className="mr-2"
                  />
                  <span>PayPal</span>
                </label>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <label className="flex items-center opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="apple_pay"
                    disabled
                    className="mr-2"
                  />
                  <span>Apple Pay</span>
                </label>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setActiveStep(2)}>
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              
              <Button
                variant="primary"
                onClick={handlePlaceOrder}
                isLoading={isLoading}
              >
                {language === 'fr' ? 'Passer la commande' : 'Place Order'}
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'fr' ? 'Finaliser la commande' : 'Checkout'}
        </h1>
        
        {/* Checkout Steps */}
        <div className="flex justify-between mb-8">
          <div className="flex-1 relative">
            <div
              className={`h-1 absolute top-3 left-0 right-0 ${
                activeStep >= 1 ? 'bg-primary' : 'bg-gray-200'
              }`}
            ></div>
            <div
              className={`h-7 w-7 rounded-full ${
                activeStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              } flex items-center justify-center z-10 relative mx-auto`}
            >
              1
            </div>
            <p className="text-center mt-2 text-sm">
              {language === 'fr' ? 'Contact' : 'Contact'}
            </p>
          </div>
          
          <div className="flex-1 relative">
            <div
              className={`h-1 absolute top-3 left-0 right-0 ${
                activeStep >= 2 ? 'bg-primary' : 'bg-gray-200'
              }`}
            ></div>
            <div
              className={`h-7 w-7 rounded-full ${
                activeStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              } flex items-center justify-center z-10 relative mx-auto`}
            >
              2
            </div>
            <p className="text-center mt-2 text-sm">
              {language === 'fr' ? 'Livraison' : 'Shipping'}
            </p>
          </div>
          
          <div className="flex-1">
            <div
              className={`h-7 w-7 rounded-full ${
                activeStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              } flex items-center justify-center z-10 relative mx-auto`}
            >
              3
            </div>
            <p className="text-center mt-2 text-sm">
              {language === 'fr' ? 'Paiement' : 'Payment'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {getStepContent()}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'fr' ? 'Récapitulatif' : 'Order Summary'}
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
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center text-gray-700">
                  <ShieldCheck className="text-green-600 mr-2" size={20} />
                  <span className="text-sm">
                    {language === 'fr' ? 'Paiement 100% sécurisé' : '100% Secure Payment'}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Truck className="text-green-600 mr-2" size={20} />
                  <span className="text-sm">
                    {language === 'fr' ? 'Livraison rapide' : 'Fast Delivery'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;