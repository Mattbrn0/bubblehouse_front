import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleChevronLeft } from 'lucide-react';

function InscriptionStep1() {
  const navigate = useNavigate();
  const [objectif, setObjectif] = useState('');

  const options = [
    { value: "stress", label: "Je veux réduire mon stress", icon: "❤️" },
    { value: "sommeil", label: "Retrouver un meilleur sommeil", icon: "🛌" },
    { value: "conscience", label: "La pleine conscience", icon: "🏳️" },
    { value: "angoisse", label: "Gérer mes crises d'angoisses", icon: "😊" },
    { value: "pooup", label: "Utiliser le poo-up", icon: "🚽" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (objectif) {
      const inscriptionData = { objectif };
      sessionStorage.setItem('inscriptionData', JSON.stringify(inscriptionData));
      navigate('/inscription-step2');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f3f2] flex flex-col items-center px-4 pt-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <button onClick={() => navigate(-1)} className="text-xl">
            <CircleChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-medium text-gray-500 font-poppins">Questionnaire</h1>
          <span className="ml-auto text-sm text-gray-400">1 sur 5</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-brown-700 mb-6 font-handy">
              Quel est ton objectif pour aujourd&apos;hui ?
            </h2>

            <div className="space-y-3">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center px-4 py-3 rounded-full border ${
                    objectif === opt.value
                      ? "bg-[#9BB168] text-white border-[#9BB168]-25%"
                      : "bg-white text-gray-700 border-gray-200"
                  } cursor-pointer transition duration-200`}
                >
                  <input
                    type="radio"
                    name="objectif"
                    value={opt.value}
                    checked={objectif === opt.value}
                    onChange={(e) => setObjectif(e.target.value)}
                    className="hidden"
                  />
                  <span className="mr-3 text-lg">{opt.icon}</span>
                  <span className="flex-grow font-medium font-poppins">{opt.label}</span>
                  <span
                    className={`w-4 h-4 rounded-full border ${
                      objectif === opt.value
                        ? "border-white bg-white"
                        : "border-gray-400"
                    }`}
                  />
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!objectif}
            className={`mt-10 w-full py-3 rounded-full font-semibold transition ${
              objectif 
                ? "bg-purple-400 text-white hover:bg-purple-500"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continuer →
          </button>
        </form>
      </div>
    </div>
  );
}

export default InscriptionStep1;
