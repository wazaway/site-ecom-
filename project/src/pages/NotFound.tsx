import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import useConfigStore from '../store/configStore';

const NotFound: React.FC = () => {
  const { language } = useConfigStore();
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        
        <h2 className="text-3xl font-semibold mb-6">
          {language === 'fr' ? 'Page non trouvée' : 'Page Not Found'}
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          {language === 'fr'
            ? 'La page que vous recherchez n\'existe pas ou a été déplacée.'
            : 'The page you are looking for doesn\'t exist or has been moved.'}
        </p>
        
        <Link to="/">
          <Button variant="primary" size="lg">
            {language === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;