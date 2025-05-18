import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Globe, Search } from 'lucide-react';
import { mockCategories } from '../../data/mockData';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import useConfigStore from '../../store/configStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const { items } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const { config, language, setLanguage } = useConfigStore();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const cartItemsCount = items.reduce((count, item) => count + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    closeMenu();
  }, [location]);
  
  const handleLanguageToggle = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">{config.siteName}</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-800 hover:text-primary transition-colors">
              {language === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <div className="group relative">
              <button className="text-gray-800 hover:text-primary transition-colors flex items-center">
                {language === 'fr' ? 'Catégories' : 'Categories'}
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  {mockCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/products" className="text-gray-800 hover:text-primary transition-colors">
              {language === 'fr' ? 'Produits' : 'Products'}
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-primary transition-colors">
              {language === 'fr' ? 'Contact' : 'Contact'}
            </Link>
          </nav>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder={language === 'fr' ? 'Rechercher un produit...' : 'Search for products...'}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 text-gray-400" size={20} />
          </div>
          
          {/* User Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLanguageToggle}
              className="text-gray-700 hover:text-primary transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>
            
            <Link to="/cart" className="text-gray-700 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <Link to="/account" className="text-gray-700 hover:text-primary transition-colors">
                <User size={20} />
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
                <User size={20} />
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg">
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder={language === 'fr' ? 'Rechercher un produit...' : 'Search for products...'}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              {language === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            
            <div className="px-3 py-2">
              <p className="text-base font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Catégories' : 'Categories'}
              </p>
              <div className="pl-4 space-y-1">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block py-1 text-sm text-gray-600 hover:text-primary"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              {language === 'fr' ? 'Produits' : 'Products'}
            </Link>
            
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              {language === 'fr' ? 'Contact' : 'Contact'}
            </Link>
            
            {isAuthenticated ? (
              <Link
                to="/account"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {language === 'fr' ? 'Mon Compte' : 'My Account'}
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {language === 'fr' ? 'Connexion' : 'Login'}
              </Link>
            )}
            
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {language === 'fr' ? 'Administration' : 'Admin'}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;