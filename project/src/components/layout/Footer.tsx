import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import useConfigStore from '../../store/configStore';

const Footer: React.FC = () => {
  const { config, language } = useConfigStore();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{config.siteName}</h3>
            <p className="text-gray-400 mb-4">
              {language === 'fr' 
                ? 'Votre destination shopping pour des produits de qualité supérieure à des prix compétitifs.'
                : 'Your shopping destination for premium quality products at competitive prices.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'fr' ? 'Liens Rapides' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'Produits' : 'Products'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'À Propos' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'Contact' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'fr' ? 'Service Client' : 'Customer Service'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'FAQ' : 'FAQs'}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'Livraison' : 'Shipping'}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'Retours' : 'Returns'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'Conditions Générales' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'fr' ? 'Contact' : 'Contact Us'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-gray-400 mr-2 mt-1" size={18} />
                <span className="text-gray-400">
                  123 {language === 'fr' ? 'Rue de Commerce' : 'Commerce Street'}, 
                  {language === 'fr' ? 'Paris, France' : 'Paris, France'}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gray-400 mr-2" size={18} />
                <span className="text-gray-400">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-gray-400 mr-2" size={18} />
                <a href="mailto:contact@wazway.com" className="text-gray-400 hover:text-white transition-colors">
                  contact@wazway.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {year} {config.siteName}. {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;