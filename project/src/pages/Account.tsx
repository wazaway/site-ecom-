import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ShoppingBag, Heart, Settings, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import useConfigStore from '../store/configStore';

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, isAuthenticated, logout } = useAuthStore();
  const { language } = useConfigStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'fr' ? 'Mon Compte' : 'My Account'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <User size={40} className="text-gray-600" />
                </div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'profile'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} className="mr-2" />
                    {language === 'fr' ? 'Profil' : 'Profile'}
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'orders'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    {language === 'fr' ? 'Commandes' : 'Orders'}
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'wishlist'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart size={18} className="mr-2" />
                    {language === 'fr' ? 'Favoris' : 'Wishlist'}
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'payments'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('payments')}
                  >
                    <CreditCard size={18} className="mr-2" />
                    {language === 'fr' ? 'Paiements' : 'Payment Methods'}
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'settings'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings size={18} className="mr-2" />
                    {language === 'fr' ? 'Paramètres' : 'Settings'}
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md flex items-center text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    {language === 'fr' ? 'Déconnexion' : 'Logout'}
                  </button>
                </li>
              </ul>
              
              {/* Admin Link */}
              {user.role === 'admin' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-md text-sm"
                    onClick={() => navigate('/admin')}
                  >
                    {language === 'fr' ? 'Panneau d\'administration' : 'Admin Dashboard'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Informations personnelles' : 'Personal Information'}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Nom complet' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue={user.name}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Adresse e-mail' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue={user.email}
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder={language === 'fr' ? 'Ajoutez votre numéro' : 'Add your number'}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Date de naissance' : 'Date of Birth'}
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">
                    {language === 'fr' ? 'Adresse par défaut' : 'Default Address'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Adresse' : 'Address Line'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Ville' : 'City'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Code postal' : 'Postal Code'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Pays' : 'Country'}
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="FR">France</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="primary">
                      {language === 'fr' ? 'Enregistrer les modifications' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Mes commandes' : 'My Orders'}
                  </h2>
                  
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto mb-3 text-gray-300" size={48} />
                    <p className="text-gray-500">
                      {language === 'fr'
                        ? 'Vous n\'avez pas encore passé de commande.'
                        : 'You haven\'t placed any orders yet.'}
                    </p>
                    <Button
                      variant="primary"
                      className="mt-4"
                      onClick={() => navigate('/products')}
                    >
                      {language === 'fr' ? 'Commencer à magasiner' : 'Start Shopping'}
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Mes favoris' : 'My Wishlist'}
                  </h2>
                  
                  <div className="text-center py-8">
                    <Heart className="mx-auto mb-3 text-gray-300" size={48} />
                    <p className="text-gray-500">
                      {language === 'fr'
                        ? 'Votre liste de favoris est vide.'
                        : 'Your wishlist is empty.'}
                    </p>
                    <Button
                      variant="primary"
                      className="mt-4"
                      onClick={() => navigate('/products')}
                    >
                      {language === 'fr' ? 'Explorer les produits' : 'Browse Products'}
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Moyens de paiement' : 'Payment Methods'}
                  </h2>
                  
                  <div className="text-center py-8">
                    <CreditCard className="mx-auto mb-3 text-gray-300" size={48} />
                    <p className="text-gray-500">
                      {language === 'fr'
                        ? 'Vous n\'avez pas encore ajouté de moyen de paiement.'
                        : 'You haven\'t added any payment methods yet.'}
                    </p>
                    <Button
                      variant="primary"
                      className="mt-4"
                    >
                      {language === 'fr' ? 'Ajouter un moyen de paiement' : 'Add Payment Method'}
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {language === 'fr' ? 'Paramètres du compte' : 'Account Settings'}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">
                        {language === 'fr' ? 'Préférences de langue' : 'Language Preferences'}
                      </h3>
                      <select className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">
                        {language === 'fr' ? 'Préférences de notification' : 'Notification Preferences'}
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span>
                            {language === 'fr'
                              ? 'Mises à jour de commande'
                              : 'Order updates'}
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span>
                            {language === 'fr'
                              ? 'Nouveaux produits'
                              : 'New products'}
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span>
                            {language === 'fr'
                              ? 'Promotions et offres spéciales'
                              : 'Promotions and special offers'}
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">
                        {language === 'fr' ? 'Changer le mot de passe' : 'Change Password'}
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder={
                            language === 'fr'
                              ? 'Mot de passe actuel'
                              : 'Current password'
                          }
                          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="password"
                          placeholder={
                            language === 'fr'
                              ? 'Nouveau mot de passe'
                              : 'New password'
                          }
                          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="password"
                          placeholder={
                            language === 'fr'
                              ? 'Confirmer le nouveau mot de passe'
                              : 'Confirm new password'
                          }
                          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <Button variant="primary" className="mt-2">
                          {language === 'fr' ? 'Mettre à jour' : 'Update'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-medium text-red-600 mb-3">
                        {language === 'fr' ? 'Zone de danger' : 'Danger Zone'}
                      </h3>
                      <Button variant="danger">
                        {language === 'fr' ? 'Supprimer mon compte' : 'Delete My Account'}
                      </Button>
                    </div>
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

export default Account;