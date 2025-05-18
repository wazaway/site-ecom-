import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import useConfigStore from '../../store/configStore';

const PromoSection: React.FC = () => {
  const { language } = useConfigStore();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Promo Card 1 */}
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src="https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg"
              alt="Special Offer"
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30 flex flex-col justify-center p-8 text-white">
              <span className="text-sm font-semibold uppercase tracking-wider mb-2">
                {language === 'fr' ? 'Offre Spéciale' : 'Special Offer'}
              </span>
              <h3 className="text-3xl font-bold mb-3">
                {language === 'fr' ? 'Jusqu\'à 40% de remise' : 'Up to 40% Off'}
              </h3>
              <p className="mb-4 max-w-xs">
                {language === 'fr'
                  ? 'Sur une sélection d\'articles pour une durée limitée. Profitez de cette offre exclusive dès maintenant.'
                  : 'On selected items for a limited time. Take advantage of this exclusive offer now.'}
              </p>
              <Link to="/products">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-auto">
                  {language === 'fr' ? 'Acheter Maintenant' : 'Shop Now'}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Promo Card 2 */}
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src="https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg"
              alt="New Collection"
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 flex flex-col justify-center p-8 text-white">
              <span className="text-sm font-semibold uppercase tracking-wider mb-2">
                {language === 'fr' ? 'Nouveau' : 'New Arrival'}
              </span>
              <h3 className="text-3xl font-bold mb-3">
                {language === 'fr' ? 'Collection Exclusive' : 'Exclusive Collection'}
              </h3>
              <p className="mb-4 max-w-xs">
                {language === 'fr'
                  ? 'Découvrez notre nouvelle collection de produits haut de gamme pour cette saison.'
                  : 'Discover our new collection of premium products for this season.'}
              </p>
              <Link to="/category/nouveautes">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black w-auto">
                  {language === 'fr' ? 'Explorer' : 'Explore'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;