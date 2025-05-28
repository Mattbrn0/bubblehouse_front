import { X, Lock } from "lucide-react";
import forgotPassword1 from "../assets/Logo/forgotpassword1.png"; // Correction du chemin et de l'import
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function PasswordSentPopup({ onClose = () => {}, userEmail = '' }) {
  const navigate = useNavigate();

  const handleClose = () => {
    try {
      onClose();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la fermeture:', error);
    }
  };

  const handleResend = () => {
    try {
      // Logique de renvoi
      console.log('Renvoi du mot de passe...');""
    } catch (error) {
      console.error('Erreur lors du renvoi:', error);
    }
  };

  const maskedEmail = userEmail.replace(/(.{3}).*(@.*)/, '$1****$2');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <div className="relative bg-white rounded-3xl shadow-lg p-6 w-80 text-center mb-4">
        {/* Image et contenu */}
        <div className="flex justify-center mb-4">
          <img
            src={forgotPassword1}
            alt="Mot de passe envoyé"
            className="w-32 h-32 rounded-lg object-contain"
          />
        </div>

        {/* Message de confirmation */}
        <p className="text-gray-800 font-medium">
          Nous avons envoyé le mot de passe à usage unique <br/>
          à votre messagerie <span className="font-semibold">{maskedEmail}</span>.
        </p>
        <p className="mt-2 text-gray-600">
          Vous n&apos;avez pas reçu votre mot de passe ? Renvoyez le mot de passe ci-dessous ! 🔑
        </p>

        {/* Bouton de renvoi centré */}
        <div className="flex justify-center">
          <button
            onClick={handleResend}
            className="mt-4 inline-flex items-center gap-2 bg-purple-400 text-white px-8 py-2 rounded-full hover:bg-purple-500 transition"
          >
            Renvoyer le mot de passe <Lock className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bouton de fermeture repositionné */}
      <button
        onClick={handleClose}
        className="bg-white rounded-full p-3 hover:bg-gray-100 transition"
      >
        <X className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
}

PasswordSentPopup.propTypes = {
  onClose: PropTypes.func,
  userEmail: PropTypes.string,
};
