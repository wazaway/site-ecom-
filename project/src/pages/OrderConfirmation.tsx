import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import useConfigStore from '../store/configStore';

const OrderConfirmation: React.FC = () => {
  const { language } = useConfigStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Generate a random order number
  const orderNumber = `WZ-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-16 text-center">
        <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
        
        <h1 className="text-3xl font-bold mb-4">
          {language === 'fr' ? 'Commande confirmée !' : 'Order Confirmed!'}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          {language === 'fr'
            ? 'Merci pour votre achat. Votre commande a bien été reçue.'
            : 'Thank you for your purchase. Your order has been received.'}
        </p>
        
        <div className="bg-gray-50 max-w-lg mx-auto rounded-lg p-6 mb-8 text-left">
          <p className="mb-4">
            <span className="font-semibold">{language === 'fr' ? 'Numéro de commande:' : 'Order Number:'}</span>{' '}
            {orderNumber}
          </p>
          
          <p className="mb-4">
            <span className="font-semibold">{language === 'fr' ? 'Date:' : 'Date:'}</span>{' '}
            {new Date().toLocaleDateString()}
          </p>
          
          <p className="mb-4">
            <span className="font-semibold">{language === 'fr' ? 'Statut:' : 'Status:'}</span>{' '}
            <span className="text-green-600 font-medium">
              {language === 'fr' ? 'En traitement' : 'Processing'}
            </span>
          </p>
          
          <p>
            <span className="font-semibold">{language === 'fr' ? 'Méthode de paiement:' : 'Payment Method:'}</span>{' '}
            {language === 'fr' ? 'Carte de crédit' : 'Credit Card'}
          </p>
        </div>
        
        <p className="text-gray-600 mb-8">
          {language === 'fr'
            ? 'Vous recevrez un email de confirmation avec les détails de votre commande.'
            : 'You will receive a confirmation email with the details of your order.'}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/account">
            <Button variant="primary">
              {language === 'fr' ? 'Suivre ma commande' : 'Track My Order'}
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline">
              {language === 'fr' ? 'Continuer vos achats' : 'Continue Shopping'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;