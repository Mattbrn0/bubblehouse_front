import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodSelection() {
  const navigate = useNavigate();
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [prenom, setPrenom] = useState('');

  useEffect(() => {
    const data = sessionStorage.getItem('inscriptionData');
    if (!data) {
      navigate('/inscription');
    } else {
      const parsedData = JSON.parse(data);
      setPrenom(parsedData.prenom || '');
    }
  }, [navigate]);

  const moods = [
    "Joyeux.se",
    "Triste",
    "Anxieux.se",
    "Déprimé.e",
    "Épuisé.e",
    "Plein.e d’énergie",
  ];

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood)
        ? prev.filter((m) => m !== mood)
        : [...prev, mood]
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-start items-center pt-12 px-4">
      {/* Header arrondi */}
      <div className="w-full bg-[#71974E] text-white px-6 py-8 rounded-b-3xl">
        <p className="text-xl font-medium mb-1">Salut {prenom} !</p>
        <p className="text-lg">Comment te sens-tu aujourd&apos;hui ?</p>
      </div>

      {/* Sous-titre */}
      <p className="mt-8 mb-4 text-gray-700">Tu peux choisir plus d’une option</p>

      {/* Boutons d’humeur */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => toggleMood(mood)}
            className={`py-3 rounded-xl text-lg font-medium transition-colors ${
              selectedMoods.includes(mood)
                ? "bg-purple-300 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Bouton continuer */}
      <button className="mt-8 bg-purple-400 text-white px-8 py-2 rounded-full hover:bg-purple-500 transition">
        Continuer
      </button>
    </div>
  );
}