import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useAuthStore from '../store/authStore';
import useConfigStore from '../store/configStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const { language } = useConfigStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll accept any email with admin@wazway.com and user@example.com
      const success = await login(email, password);
      
      if (success) {
        navigate('/account');
      } else {
        setError(
          language === 'fr'
            ? 'Email ou mot de passe incorrect.'
            : 'Invalid email or password.'
        );
      }
    } catch (err) {
      setError(
        language === 'fr'
          ? 'Une erreur est survenue. Veuillez réessayer.'
          : 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {language === 'fr' ? 'Connexion' : 'Sign In'}
          </h1>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 flex items-start">
              <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={language === 'fr' ? 'Adresse e-mail' : 'Email Address'}
              type="email"
              placeholder={language === 'fr' ? 'Votre email' : 'Your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              leftIcon={<Mail size={18} />}
            />
            
            <Input
              label={language === 'fr' ? 'Mot de passe' : 'Password'}
              type="password"
              placeholder={language === 'fr' ? 'Votre mot de passe' : 'Your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              leftIcon={<Lock size={18} />}
            />
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">
                  {language === 'fr' ? 'Se souvenir de moi' : 'Remember me'}
                </span>
              </label>
              
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                {language === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
              </Link>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              {language === 'fr' ? 'Se connecter' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {language === 'fr' ? 'Pas encore de compte ?' : 'Don\'t have an account?'}{' '}
              <Link to="/register" className="text-primary hover:text-primary-dark">
                {language === 'fr' ? 'S\'inscrire' : 'Sign Up'}
              </Link>
            </p>
            
            {/* Demo Credentials */}
            <div className="mt-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
              <p className="mb-2">
                {language === 'fr' ? 'Identifiants de démonstration :' : 'Demo Credentials:'}
              </p>
              <p>Admin: admin@wazway.com</p>
              <p>User: user@example.com</p>
              <p className="mt-1">{language === 'fr' ? 'Mot de passe : tout mot de passe fonctionnera' : 'Password: any password will work'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;