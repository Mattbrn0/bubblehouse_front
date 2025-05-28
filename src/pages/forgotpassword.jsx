import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Mosaique from "../assets/Logo/forgotpassword2.png";
import PasswordSentPopup from "./popup-forgot-password";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  const handleSend = () => {
    if (isSelected && email) {
      setShowPopup(true);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-start p-6">
        <div className="self-start mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-neutral-200 transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
          <p className="text-gray-600">
            Sélectionnez la manière dont vous souhaitez réinitialiser votre mot de passe.
          </p>
        </div>

        {/* Option de réinitialisation */}
        <div className="flex items-center justify-center mb-8 w-full max-w-xs">
          <button 
            onClick={() => setIsSelected(!isSelected)}
            className={`flex items-center gap-4 bg-white border-2 ${
              isSelected ? 'border-purple-500' : 'border-[#71974E]'
            } rounded-full p-4 w-full hover:shadow-md transition`}
          >
            <img
              src={Mosaique} 
              alt="Icône de réinitialisation"
              className="w-12 h-12"
            />
            <span className="text-gray-800 font-medium">Mot de passe à usage unique</span>
          </button>
        </div>

        {/* Champ email */}
        <div className="w-full max-w-xs mb-8">
       <input
          type="email"
          name="email"
          placeholder="Votre Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none"
          required
        />

        </div>

        {/* Bouton d'envoi */}
        <button 
          onClick={handleSend}
          disabled={!isSelected || !email}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition ${
            isSelected && email
              ? 'bg-[#71974E] hover:bg-[#5e7f41] text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Envoyer le mot de passe <Lock className="w-5 h-5" />
        </button>
      </div>

      {showPopup && (
        <PasswordSentPopup onClose={() => setShowPopup(false)} userEmail={email} />
      )}
    </div>
  );
}
