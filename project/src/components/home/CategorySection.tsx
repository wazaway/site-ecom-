import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from '../../data/mockData';
import useConfigStore from '../../store/configStore';

const CategorySection: React.FC = () => {
  const { language } = useConfigStore();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'fr' ? 'Parcourir Les Catégories' : 'Browse Categories'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Découvrez notre sélection de produits organisés par catégories pour une expérience de shopping simplifiée.'
              : 'Explore our curated product selection organized by categories for a simplified shopping experience.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {mockCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Category Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Category Name */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-semibold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;