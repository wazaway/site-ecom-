import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, Settings, BarChart3, ShoppingBag, Grid, Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import useConfigStore from '../store/configStore';
import { mockProducts, mockCategories } from '../data/mockData';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, isAuthenticated } = useAuthStore();
  const { config, updateSiteName, language } = useConfigStore();
  const navigate = useNavigate();
  
  const [siteName, setSiteName] = useState(config.siteName);
  
  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  
  const handleSiteNameUpdate = () => {
    updateSiteName(siteName);
  };
  
  if (!user || user.role !== 'admin') {
    return null;
  }
  
  return (
    <div className="bg-gray-100 pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'fr' ? 'Panneau d\'administration' : 'Admin Dashboard'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <ul>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'dashboard'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <BarChart3 size={20} className="mr-2" />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'products'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('products')}
                  >
                    <Package size={20} className="mr-2" />
                    <span>{language === 'fr' ? 'Produits' : 'Products'}</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'categories'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('categories')}
                  >
                    <Grid size={20} className="mr-2" />
                    <span>{language === 'fr' ? 'Catégories' : 'Categories'}</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'orders'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <ShoppingBag size={20} className="mr-2" />
                    <span>{language === 'fr' ? 'Commandes' : 'Orders'}</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'users'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('users')}
                  >
                    <Users size={20} className="mr-2" />
                    <span>{language === 'fr' ? 'Utilisateurs' : 'Users'}</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'settings'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings size={20} className="mr-2" />
                    <span>{language === 'fr' ? 'Paramètres' : 'Settings'}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Tableau de bord' : 'Dashboard Overview'}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h3 className="text-gray-500 text-sm mb-1">
                        {language === 'fr' ? 'Total des produits' : 'Total Products'}
                      </h3>
                      <p className="text-2xl font-semibold">{mockProducts.length}</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <h3 className="text-gray-500 text-sm mb-1">
                        {language === 'fr' ? 'Commandes' : 'Orders'}
                      </h3>
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                      <h3 className="text-gray-500 text-sm mb-1">
                        {language === 'fr' ? 'Utilisateurs' : 'Users'}
                      </h3>
                      <p className="text-2xl font-semibold">2</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <h3 className="text-gray-500 text-sm mb-1">
                        {language === 'fr' ? 'Catégories' : 'Categories'}
                      </h3>
                      <p className="text-2xl font-semibold">{mockCategories.length}</p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-3">
                    {language === 'fr' ? 'Actions rapides' : 'Quick Actions'}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    <Button
                      variant="primary"
                      leftIcon={<Plus size={16} />}
                      size="sm"
                      onClick={() => setActiveTab('products')}
                    >
                      {language === 'fr' ? 'Ajouter un produit' : 'Add Product'}
                    </Button>
                    
                    <Button
                      variant="secondary"
                      leftIcon={<Plus size={16} />}
                      size="sm"
                      onClick={() => setActiveTab('categories')}
                    >
                      {language === 'fr' ? 'Ajouter une catégorie' : 'Add Category'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('settings')}
                    >
                      {language === 'fr' ? 'Paramètres du site' : 'Site Settings'}
                    </Button>
                  </div>
                  
                  <h3 className="font-semibold mb-3">
                    {language === 'fr' ? 'Produits récents' : 'Recent Products'}
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Nom' : 'Name'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Prix' : 'Price'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Stock' : 'Stock'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Catégorie' : 'Category'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockProducts.slice(0, 5).map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                              {product.salePrice && (
                                <div className="text-xs text-red-500">${product.salePrice.toFixed(2)}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.stock > 10
                                  ? 'bg-green-100 text-green-800'
                                  : product.stock > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.stock}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {mockCategories.find(c => c.id === product.category)?.name || ''}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {language === 'fr' ? 'Gestion des produits' : 'Product Management'}
                    </h2>
                    
                    <Button
                      variant="primary"
                      leftIcon={<Plus size={16} />}
                    >
                      {language === 'fr' ? 'Ajouter un produit' : 'Add Product'}
                    </Button>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={language === 'fr' ? 'Rechercher des produits...' : 'Search products...'}
                        className="w-64 px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <select className="px-4 py-2 border border-gray-300 rounded-md">
                        <option value="">{language === 'fr' ? 'Toutes les catégories' : 'All Categories'}</option>
                        {mockCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      
                      <select className="px-4 py-2 border border-gray-300 rounded-md">
                        <option value="newest">{language === 'fr' ? 'Plus récent' : 'Newest'}</option>
                        <option value="oldest">{language === 'fr' ? 'Plus ancien' : 'Oldest'}</option>
                        <option value="price-asc">{language === 'fr' ? 'Prix croissant' : 'Price: Low to High'}</option>
                        <option value="price-desc">{language === 'fr' ? 'Prix décroissant' : 'Price: High to Low'}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Produit' : 'Product'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Prix' : 'Price'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Stock' : 'Stock'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Catégorie' : 'Category'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Vedette' : 'Featured'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Actions' : 'Actions'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-xs text-gray-500">ID: {product.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                              {product.salePrice && (
                                <div className="text-xs text-red-500">${product.salePrice.toFixed(2)}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.stock > 10
                                  ? 'bg-green-100 text-green-800'
                                  : product.stock > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.stock}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {mockCategories.find(c => c.id === product.category)?.name || ''}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.featured
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {product.featured ? (language === 'fr' ? 'Oui' : 'Yes') : (language === 'fr' ? 'Non' : 'No')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                {language === 'fr' ? 'Modifier' : 'Edit'}
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                {language === 'fr' ? 'Supprimer' : 'Delete'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'categories' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {language === 'fr' ? 'Gestion des catégories' : 'Category Management'}
                    </h2>
                    
                    <Button
                      variant="primary"
                      leftIcon={<Plus size={16} />}
                    >
                      {language === 'fr' ? 'Ajouter une catégorie' : 'Add Category'}
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Nom' : 'Name'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Slug' : 'Slug'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Image' : 'Image'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Produits' : 'Products'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Actions' : 'Actions'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockCategories.map((category) => (
                          <tr key={category.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {category.slug}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-10 w-10">
                                <img className="h-10 w-10 rounded-md object-cover" src={category.image} alt="" />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {mockProducts.filter(p => p.category === category.id).length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                {language === 'fr' ? 'Modifier' : 'Edit'}
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                {language === 'fr' ? 'Supprimer' : 'Delete'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Paramètres du site' : 'Site Settings'}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">
                        {language === 'fr' ? 'Informations générales' : 'General Information'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Nom du site' : 'Site Name'}
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              value={siteName}
                              onChange={(e) => setSiteName(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                            />
                            <Button
                              variant="primary"
                              className="rounded-l-none"
                              onClick={handleSiteNameUpdate}
                            >
                              {language === 'fr' ? 'Mettre à jour' : 'Update'}
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Logo' : 'Logo'}
                          </label>
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                              <img src={config.logo} alt="Logo" className="h-8 w-8" />
                            </div>
                            <Button variant="outline">
                              {language === 'fr' ? 'Changer le logo' : 'Change Logo'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">
                        {language === 'fr' ? 'Thème et apparence' : 'Theme & Appearance'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Couleur principale' : 'Primary Color'}
                          </label>
                          <div className="flex items-center">
                            <div
                              className="h-6 w-6 rounded-md mr-2"
                              style={{ backgroundColor: config.theme.primaryColor }}
                            ></div>
                            <input
                              type="text"
                              value={config.theme.primaryColor}
                              className="px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Couleur secondaire' : 'Secondary Color'}
                          </label>
                          <div className="flex items-center">
                            <div
                              className="h-6 w-6 rounded-md mr-2"
                              style={{ backgroundColor: config.theme.secondaryColor }}
                            ></div>
                            <input
                              type="text"
                              value={config.theme.secondaryColor}
                              className="px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Couleur d\'accent' : 'Accent Color'}
                          </label>
                          <div className="flex items-center">
                            <div
                              className="h-6 w-6 rounded-md mr-2"
                              style={{ backgroundColor: config.theme.accentColor }}
                            ></div>
                            <input
                              type="text"
                              value={config.theme.accentColor}
                              className="px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">
                        {language === 'fr' ? 'Langues' : 'Languages'}
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked
                            disabled
                            className="mr-2"
                          />
                          <span>Français</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked
                            disabled
                            className="mr-2"
                          />
                          <span>English</span>
                        </label>
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Langue par défaut' : 'Default Language'}
                          </label>
                          <select className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md">
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="primary">
                        {language === 'fr' ? 'Enregistrer les modifications' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Gestion des commandes' : 'Order Management'}
                  </h2>
                  
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto mb-3 text-gray-300" size={48} />
                    <p className="text-gray-500">
                      {language === 'fr'
                        ? 'Aucune commande n\'a encore été passée.'
                        : 'No orders have been placed yet.'}
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Gestion des utilisateurs' : 'User Management'}
                  </h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Nom' : 'Name'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Email' : 'Email'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Rôle' : 'Role'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Date d\'inscription' : 'Sign-up Date'}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'fr' ? 'Actions' : 'Actions'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { id: '1', name: 'Admin', email: 'admin@wazway.com', role: 'admin', createdAt: '2023-09-01T00:00:00Z' },
                          { id: '2', name: 'Utilisateur Test', email: 'user@example.com', role: 'user', createdAt: '2023-10-15T00:00:00Z' },
                        ].map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {user.role === 'admin'
                                  ? (language === 'fr' ? 'Administrateur' : 'Admin')
                                  : (language === 'fr' ? 'Utilisateur' : 'User')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                {language === 'fr' ? 'Modifier' : 'Edit'}
                              </button>
                              {user.role !== 'admin' && (
                                <button className="text-red-600 hover:text-red-900">
                                  {language === 'fr' ? 'Supprimer' : 'Delete'}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;