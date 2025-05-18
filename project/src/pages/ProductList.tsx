import React, { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import useConfigStore from '../store/configStore';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  const { language } = useConfigStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // Filter products based on selected filters
    let result = [...products];
    
    // Filter by price range
    result = result.filter(
      (product) => {
        const price = product.salePrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Featured products first, then sort by rating
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
    
    setFilteredProducts(result);
  }, [products, priceRange, selectedCategories, sortBy]);
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(event.target.value);
    setPriceRange((prev) => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'fr' ? 'Tous les produits' : 'All Products'}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <button
            className="md:hidden flex items-center justify-center py-2 px-4 bg-gray-100 rounded-md mb-4"
            onClick={toggleFilters}
          >
            <SlidersHorizontal size={20} className="mr-2" />
            {language === 'fr' ? 'Filtres' : 'Filters'}
          </button>
          
          {/* Filters Sidebar */}
          <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-gray-50 p-4 rounded-lg sticky top-24">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">
                  {language === 'fr' ? 'Trier par' : 'Sort By'}
                </h3>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">
                    {language === 'fr' ? 'En vedette' : 'Featured'}
                  </option>
                  <option value="price-asc">
                    {language === 'fr' ? 'Prix: Croissant' : 'Price: Low to High'}
                  </option>
                  <option value="price-desc">
                    {language === 'fr' ? 'Prix: Décroissant' : 'Price: High to Low'}
                  </option>
                  <option value="newest">
                    {language === 'fr' ? 'Nouveautés' : 'Newest'}
                  </option>
                  <option value="rating">
                    {language === 'fr' ? 'Avis clients' : 'Customer Rating'}
                  </option>
                </select>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">
                  {language === 'fr' ? 'Catégories' : 'Categories'}
                </h3>
                <div className="space-y-2">
                  {/* Simplified categories for demo */}
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('1')}
                      onChange={() => handleCategoryChange('1')}
                      className="mr-2"
                    />
                    {language === 'fr' ? 'Vêtements' : 'Clothing'}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('2')}
                      onChange={() => handleCategoryChange('2')}
                      className="mr-2"
                    />
                    {language === 'fr' ? 'Électronique' : 'Electronics'}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('3')}
                      onChange={() => handleCategoryChange('3')}
                      className="mr-2"
                    />
                    {language === 'fr' ? 'Maison' : 'Home'}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('4')}
                      onChange={() => handleCategoryChange('4')}
                      className="mr-2"
                    />
                    {language === 'fr' ? 'Sport' : 'Sports'}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('5')}
                      onChange={() => handleCategoryChange('5')}
                      className="mr-2"
                    />
                    {language === 'fr' ? 'Beauté' : 'Beauty'}
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">
                  {language === 'fr' ? 'Gamme de prix' : 'Price Range'}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  {language === 'fr' ? 'Évaluation' : 'Rating'}
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? 'text-yellow-400' : 'text-gray-300'
                            } fill-current`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-gray-600 text-sm">
                        {language === 'fr' ? 'et plus' : '& up'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {language === 'fr'
                  ? `${filteredProducts.length} produits trouvés`
                  : `${filteredProducts.length} products found`}
              </p>
            </div>
            
            <ProductGrid 
              products={filteredProducts} 
              emptyMessage={
                language === 'fr'
                  ? 'Aucun produit ne correspond à vos critères. Veuillez ajuster vos filtres.'
                  : 'No products match your criteria. Please adjust your filters.'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;