import { useNavigate } from 'react-router-dom';
import Bubblehouse from "../assets/Logo/Full_FB_V.png";
import Mascotte from "../assets/Logo/Icon_FB_V.png";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 text-center font-sans">
      {/* Logo */}
      <div className="mt-4">
        <img
          src={Bubblehouse}
          alt="BubbleHouse Logo"
          className="h-40 mx-auto"
        />
      </div>

      {/* Titre */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-gray-900 font-handy">Bienvenue chez BubbleHouse !</h1>
        <p className="text-lg text-gray-600 mt-2 font-poppins">Le paradis de la relaxation</p>
      </div>

      {/* Illustration */}
      <div className="mt-10">
        <img
          src={Mascotte}
          alt="Mascotte BubbleHouse"
          className="h-60 mx-auto"
        />
      </div>

      {/* Bouton d'inscription */}
      <div className="mt-10 w-full">
        <p className="text-gray-800 mb-4 font-poppins">Créer un compte pour sauvegarder vos progrès</p>
        <button 
          onClick={() => navigate('/inscription')}
          className="w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Continuer avec un Email →
        </button>
      </div>

      {/* Lien de connexion */}
      <div className="mt-8 mb-4">
        <p className="text-sm text-gray-700 font-poppins">
          Vous possédez déjà un compte ?{" "}
          <button
            onClick={() => navigate('/login')}
            className="text-gray-900 font-bold underline"
          >
            Connexion
          </button>
        </p>
      </div>
    </div>
  );
}

export default Home;


