import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useAuthStore from '../store/authStore';
import useConfigStore from '../store/configStore';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuthStore();
  const { language } = useConfigStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (password !== confirmPassword) {
      setError(
        language === 'fr'
          ? 'Les mots de passe ne correspondent pas.'
          : 'Passwords do not match.'
      );
      return;
    }
    
    if (password.length < 6) {
      setError(
        language === 'fr'
          ? 'Le mot de passe doit contenir au moins 6 caractères.'
          : 'Password must be at least 6 characters.'
      );
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(email, name, password);
      
      if (success) {
        navigate('/account');
      } else {
        setError(
          language === 'fr'
            ? 'Cet email est déjà utilisé.'
            : 'This email is already in use.'
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
            {language === 'fr' ? 'Créer un compte' : 'Create an Account'}
          </h1>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 flex items-start">
              <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={language === 'fr' ? 'Nom complet' : 'Full Name'}
              type="text"
              placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              leftIcon={<User size={18} />}
            />
            
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
              placeholder={language === 'fr' ? 'Créer un mot de passe' : 'Create a password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              leftIcon={<Lock size={18} />}
              helperText={
                language === 'fr'
                  ? 'Au moins 6 caractères'
                  : 'At least 6 characters'
              }
            />
            
            <Input
              label={language === 'fr' ? 'Confirmer le mot de passe' : 'Confirm Password'}
              type="password"
              placeholder={language === 'fr' ? 'Confirmer votre mot de passe' : 'Confirm your password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              leftIcon={<Lock size={18} />}
            />
            
            <div className="flex items-center">
              <input type="checkbox" id="terms" required className="mr-2" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                {language === 'fr'
                  ? "J'accepte les Conditions Générales et la Politique de Confidentialité"
                  : 'I agree to the Terms of Service and Privacy Policy'}
              </label>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              {language === 'fr' ? 'S\'inscrire' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {language === 'fr' ? 'Vous avez déjà un compte ?' : 'Already have an account?'}{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark">
                {language === 'fr' ? 'Se connecter' : 'Sign In'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;