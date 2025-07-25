import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ChevronLeft } from "lucide-react";
import { supabase } from '../../supabaseClient';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  
  useEffect(() => {
    if (location.search.includes('signup=true')) {
      setShowEmailAlert(true);
      window.history.replaceState({}, '', '/login');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          setError('Email ou mot de passe incorrect');
        } else {
          setError(error.message);
        }
        return;
      }

      navigate('/home-page');

    } catch (err) {
      setError('Une erreur s\'est produite lors de la connexion');
      console.error('Erreur détaillée:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 space-y-6">
      {/* Bouton retour */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 text-black"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-handy">Connexion</h1>
        <h2 className="text-3xl font-bold font-handy">à BubbleHouse</h2>
        <p className="text-lg mt-2 font-semibold font-poppins">Content de vous revoir !</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg w-full max-w-sm" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {showEmailAlert && (
        <div className="mb-6 p-4 bg-[#A67DB9]/10 border-l-4 border-[#A67DB9] rounded">
          <p className="text-[#42210B] font-medium">
            Un email de confirmation a été envoyé à votre adresse. 
            Veuillez vérifier votre boîte de réception pour activer votre compte.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 font-poppins">Adresse e-mail</label>
          <div className="flex items-center bg-[#f9f3f2] border border-green-100 rounded-full px-4 py-3 shadow-md">
            <Mail className="w-5 h-5 mr-2 text-gray-600" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre e-mail..."
              className="bg-transparent flex-1 outline-none text-sm font-poppins"
              required
              disabled={isLoading}
            />
          </div>
      {showEmailAlert && (
        <div className="mb-6 p-4 bg-[#A67DB9]/10 border-l-4 border-[#A67DB9] rounded">
          <p className="text-[#42210B] font-medium">
            Un email de confirmation a été envoyé à votre adresse. 
            Veuillez vérifier votre boîte de réception pour activer votre compte.
          </p>
        </div>
      )}

        </div>

        <div>
          <label className="block text-sm font-medium mb-1 font-poppins">Mot de passe</label>
          <div className="flex items-center bg-[#f9f3f2] rounded-full px-4 py-3 shadow-md">
            <Lock className="w-5 h-5 mr-2 text-gray-600" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              className="bg-transparent flex-1 outline-none text-sm font-poppins"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-600" />
              ) : (
                <Eye className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#71974E] text-white py-3 rounded-full font-medium transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#5e7f41]'
          }`}
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <div className="text-center text-sm space-y-1 font-poppins">
        <p>
          Vous n&apos;avez pas de compte ?{" "}
          <button
            onClick={() => navigate('/inscription-steps')}
            className="font-bold underline text-black"
          >
            Inscription
          </button>
        </p>
        <button
          onClick={() => navigate('/forgot-password')}
          className="underline text-xs text-gray-700"
        >
          Mot de passe oublié
        </button>
      </div>
    </div>
  );
}

export default Login;