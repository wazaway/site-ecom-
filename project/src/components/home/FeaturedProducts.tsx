import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../product/ProductGrid';
import { mockProducts } from '../../data/mockData';
import useConfigStore from '../../store/configStore';

const FeaturedProducts: React.FC = () => {
  const { language } = useConfigStore();
  
  const featuredProducts = mockProducts.filter(product => product.featured);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {language === 'fr' ? 'Produits Vedettes' : 'Featured Products'}
          </h2>
          
          <Link 
            to="/products" 
            className="text-primary hover:text-primary-dark flex items-center transition-colors"
          >
            <span className="mr-1">{language === 'fr' ? 'Voir tous' : 'View all'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;