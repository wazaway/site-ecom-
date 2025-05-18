import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import useConfigStore from '../../store/configStore';

const HeroSection: React.FC = () => {
  const { language } = useConfigStore();
  
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg)', zIndex: -1 }}
      ></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {language === 'fr' 
              ? 'Découvrez le Shopping de Demain' 
              : 'Discover the Future of Shopping'}
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {language === 'fr'
              ? 'Des produits uniques, de qualité supérieure, livrés directement chez vous. Explorez notre collection exclusive.'
              : 'Unique, high-quality products delivered directly to your door. Explore our exclusive collection.'}
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/products">
              <Button size="lg" variant="primary">
                {language === 'fr' ? 'Acheter Maintenant' : 'Shop Now'}
              </Button>
            </Link>
            
            <Link to="/category/nouveautes">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
                {language === 'fr' ? 'Nouveautés' : 'New Arrivals'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Wave Shape Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;