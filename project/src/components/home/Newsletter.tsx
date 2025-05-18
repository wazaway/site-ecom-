import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import useConfigStore from '../../store/configStore';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language } = useConfigStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you would send this to your backend
      console.log('Subscribed email:', email);
      setEmail('');
      
      // Reset the submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
          
          <h2 className="text-3xl font-bold mb-4">
            {language === 'fr' ? 'Restez informé' : 'Stay Updated'}
          </h2>
          
          <p className="text-gray-600 mb-8">
            {language === 'fr'
              ? 'Abonnez-vous à notre newsletter pour recevoir les dernières actualités, offres exclusives et réductions.'
              : 'Subscribe to our newsletter to receive the latest news, exclusive offers, and discounts.'}
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md animate-fadeIn">
              {language === 'fr'
                ? 'Merci pour votre inscription ! Vous recevrez bientôt nos dernières actualités.'
                : 'Thank you for subscribing! You will soon receive our latest updates.'}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder={language === 'fr' ? 'Votre adresse email' : 'Your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  leftIcon={<Mail size={16} />}
                  className="mb-0"
                />
              </div>
              
              <Button type="submit" variant="primary">
                {language === 'fr' ? 'S\'abonner' : 'Subscribe'}
              </Button>
            </form>
          )}
          
          <p className="text-gray-500 text-sm mt-4">
            {language === 'fr'
              ? 'Nous ne partagerons jamais votre adresse e-mail. Consultez notre politique de confidentialité.'
              : 'We\'ll never share your email address. See our privacy policy.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;