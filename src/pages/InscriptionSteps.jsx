import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  Heart,
  Bed,
  Brain,
  Smile,
  Mouse,
  X,
  Code,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react';
import men from '../assets/Logo/men.png';
import women from '../assets/Logo/women.png';
import Mascotte from "../assets/Logo/Icon_FB_V.png";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';


const AGE_MIN = 16;
const AGE_MAX = 30;

export default function Questionnaire() {
  const [step, setStep] = useState(0); // Commencer à l'étape 0
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(18);
  const [noAnswer, setNoAnswer] = useState(false);
  const listRef = useRef(null);
  const [sleepQuality, setSleepQuality] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [answers, setAnswers] = useState({});
  const [stressLevel, setStressLevel] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const goals = [
    { label: 'Je veux réduire mon stress', icon: <Heart size={20} /> },
    { label: 'Retrouver un meilleur sommeil', icon: <Bed size={20} /> },
    { label: 'La pleine conscience', icon: <Brain size={20} /> },
    { label: 'Gérer mes crises d’angoisses', icon: <Smile size={20} /> },
    { label: 'Utiliser le poo-up', icon: <Mouse size={20} /> },
  ];

   const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Adresse e-mail invalide");
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const handleScroll = () => {
    const container = listRef.current;
    if (!container) return;

    const itemHeight = 56;
    const scrollTop = container.scrollTop;
    const index = Math.round((scrollTop - 40) / itemHeight); // Changé de 80 à 40
    const newAge = AGE_MIN + index;
    
    if (newAge >= AGE_MIN && newAge <= AGE_MAX) {
      setSelectedAge(newAge);
      setAnswers((prev) => ({ ...prev, age: newAge }));
      setNoAnswer(false);
    }
  };

  const scrollToAge = (age) => {
    const container = listRef.current;
    if (container) {
      const itemHeight = 56;
      container.scrollTo({
        // Ajustement du calcul pour aligner le chiffre au-dessus
        top: (age - AGE_MIN) * itemHeight + 40, // Changé de 80 à 40
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (step === 3) {
      scrollToAge(selectedAge);
    }
  }, [selectedAge, step]);

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Fonction helper pour obtenir le label correspondant à la qualité
  const getLabelFromQuality = (quality) => {
    const labels = {
      1: 'Survie',
      2: 'Zombie sociable',
      3: 'Pas assez',
      4: 'Pile poil',
      5: 'Mode Koala'
    };
    return labels[quality] || '';
  };

  // Fonction auxiliaire pour obtenir le label du niveau de stress
  const getStressLabel = (level) => {
    switch(level) {
      case 1: return "Très détendu";
      case 2: return "Plutôt calme";
      case 3: return "Stress modéré";
      case 4: return "Assez stressé";
      case 5: return "Extrêmement stressé";
      default: return "";
    }
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      setAnswers(prev => ({
        ...prev,
        email: formData.email,
      }));

      // Passez à l'étape suivante
      setStep(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      if (step === 0) {
        await handleSignUp();
      } else if (step === 1 && selectedGoal) {
        setStep(2);
      } else if (step === 2 && selectedGender) {
        setStep(3);
      } else if (step === 3 && (selectedAge || noAnswer)) {
        setStep(4);
      } else if (step === 4 && sleepQuality) {
        setStep(5);
      } else if (step === 5 && stressLevel !== null) {
          const payload = {
            ...answers,
            // juste pour les labels et non pas tous les champs
            qualite_sommeil: getLabelFromQuality(sleepQuality),
            stress: getStressLabel(stressLevel), 
          };

          const { error } = await supabase.from('users').insert([payload]);


        if (error) throw error;

        navigate('/login?signup=true');
        console.log('Données envoyées à Supabase :', answers);
        console.log('Erreur Supabase :', error);
      } 
    } catch (error) {
      console.error('Erreur:', error.message);
      // Gérer l'erreur (afficher un message à l'utilisateur par exemple)
    }
  };

  const handleDragStart = () => {
  setIsDragging(true);
};


  const handleDragMove = (e) => {
    if (!isDragging) return;

    const container = e.currentTarget.getBoundingClientRect();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const relativeY = clientY - container.top;

    const sectionHeight = container.height / 5;
    const index = Math.min(4, Math.max(0, Math.floor(relativeY / sectionHeight)));
    // On inverse l'index pour que monter augmente la qualité
    setSleepQuality(1 + index);
    setAnswers((prev) => ({
      ...prev,
      qualite_sommeil: {
        value: 1 + index,
        label: getLabelFromQuality(1 + index)
      }
    }));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF5F2] px-4 py-6 flex flex-col items-center">
      {/* Header modifié pour inclure l'étape 0 */}
      {step !== 0 && (
    <div className="w-full max-w-md flex justify-between items-center mb-6 mt-5">
      <div className="flex items-center text-[#5E4033] space-x-2 cursor-pointer" onClick={handleBack}>
        <ChevronLeft size={20} />
        <span className="text-lg font-medium">Questionnaire</span>
      </div>
      <p className="text-sm bg-[#EDE1DA] text-[#5E4033] px-3 py-1 rounded-full font-medium">
        {step} sur 5
      </p>
    </div>
  )}

      {/* Step 0 - Inscription */}
      {step === 0 && (
      <div className="w-full max-w-sm space-y-6">
        <button onClick={() => navigate(-1)} className="text-black mb-2">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex justify-center">
          <img src={Mascotte} alt="Logo" className="h-50" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold font-handy">S&apos;inscrire</h1>
          <h2 className="text-2xl font-bold font-handy">à BubbleHouse</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium font-poppins">
              Adresse e-mail
            </label>
            <div
              className={`flex items-center px-4 py-3 rounded-full shadow-md ${
                emailError
                  ? "bg-red-100 border border-red-500"
                  : "bg-[#f9f3f2] border border-pink-100"
              }`}
            >
              <Mail className="w-5 h-5 mr-2 text-gray-600" />
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder="Entrez votre e-mail..."
                className="bg-transparent outline-none text-sm flex-1 font-poppins"
                required
              />
            </div>
            {emailError && (
              <div className="flex items-center px-4 py-3 rounded-full bg-red-100 border border-red-500">
                <Mail className="w-5 h-5 mr-2 text-gray-600" />
                <p className="text-sm text-red-600">{emailError}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-poppins">
              Mot de passe
            </label>
            <div className="flex items-center bg-[#f9f3f2] rounded-full px-4 py-3 shadow-md">
              <Lock className="w-5 h-5 mr-2 text-gray-600" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Entrez votre mot de passe"
                className="bg-transparent flex-1 outline-none text-sm font-poppins"
                required
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

          <div className="space-y-2">
            <label className="text-sm font-medium font-poppins">
              Confirmer le mot de passe
            </label>
            <div className="flex items-center bg-[#f9f3f2] rounded-full px-4 py-3 shadow-md">
              <Lock className="w-5 h-5 mr-2 text-gray-600" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirmez votre mot de passe"
                className="bg-transparent flex-1 outline-none text-sm font-poppins"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="ml-2 focus:outline-none"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center text-sm space-y-1 mt-5 font-poppins">
          <p>
            Vous possédez déjà un compte ?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-bold underline text-black"
            >
              Connexion
            </button>
          </p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="underline text-xs text-gray-700"
          >
            Mot de passe oublié
          </button>
        </div>
      </div>

      )}

      {/* Step 1 */}
      {step === 1 && (
        <>
          <div className="w-full max-w-md text-center mb-6">
            <h2 className="text-xl font-bold text-[#42210B] leading-snug">
              Quel est ton objectif pour aujourd’hui ?
            </h2>
          </div>
          <div className="w-full max-w-md space-y-4">
            {goals.map((goal) => {
              const selected = selectedGoal === goal.label;
              return (
                <button
                  key={goal.label}
                  onClick={() => {
                    setSelectedGoal(goal.label);
                    setAnswers((prev) => ({ ...prev, objectif: goal.label }));
                  }}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-full transition-all ${
                    selected
                      ? 'bg-[#A3BC6D] text-white shadow-inner'
                      : 'bg-white text-[#5E4033] border border-white'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span>{goal.icon}</span>
                    <span className={`font-semibold ${selected ? 'text-white' : ''}`}>
                      {goal.label}
                    </span>
                  </span>
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      selected ? 'border-white bg-white' : 'border-[#5E4033]'
                    } flex items-center justify-center`}
                  >
                    {selected && <span className="w-2 h-2 rounded-full bg-[#A3BC6D]"></span>}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <div className="w-full max-w-md text-center mb-8 mt-16">
            <h2 className="text-2xl font-bold text-[#42210B] leading-snug">
              Quel est ton genre ?
            </h2>
          </div>

          <div className="w-full max-w-md space-y-4">
            {['Homme', 'Femme'].map((gender) => (
              <button
                key={gender}
                onClick={() => {
                  setSelectedGender(gender);
                  setAnswers((prev) => ({ ...prev, genre: gender }));
                }}
                className={`flex items-center justify-between w-full rounded-3xl p-4 border-2 transition-all ${
                  selectedGender === gender
                    ? 'border-[#A882DD] bg-white'
                    : 'border-transparent bg-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#5E4033] mb-2">
                    {gender === 'Homme' ? 'Homme' : 'Femme'}
                  </span>
                  <span className="text-lg">{gender === 'Homme' ? '♂' : '♀'}</span>
                </div>
                <img
                  src={gender === 'Homme' ? men : women}
                  alt={gender}
                  className="h-24 object-contain"
                />
              </button>
            ))}
          </div>

          <div className="w-full max-w-md mt-6">
            <button
              onClick={() => {
              setSelectedGender('ne_pas_repondre');
              setAnswers((prev) => ({ ...prev, genre: 'ne_pas_repondre' }));
              }}

              className={`w-full bg-[#E3D2F4] text-[#5E4033] font-medium py-3 rounded-full ${
                selectedGender === 'ne_pas_repondre' ? 'ring-2 ring-[#A882DD]' : ''
              }`}
            >
              Préfère ne pas répondre ✕
            </button>
          </div>
        </>
      )}

       {/* Step 3 */}
      {step === 3 && (
        <>
          <div className="w-full max-w-md text-center mb-8 mt-10">
            <h2 className="text-2xl font-bold text-[#42210B] leading-snug">
              Quel est ton âge ?
            </h2>
          </div>

          <div className="relative h-[250px] w-full max-w-sm overflow-hidden">
            {/* Ajout d'un padding pour centrer */}
            <div
              ref={listRef}
              onScroll={handleScroll}
              className="h-full overflow-y-scroll scrollbar-none snap-y snap-mandatory"
            >
              <div className="flex flex-col items-center">
                {/* Ajout d'un espace vide en haut pour le centrage */}
                <div className="h-[80px]" />
                
                {Array.from({ length: AGE_MAX - AGE_MIN + 1 }, (_, i) => {
                  const age = AGE_MIN + i;
                  const isSelected = age === selectedAge && !noAnswer;
                  return (
                    <div
                      key={age}
                      className={`h-14 flex items-center justify-center text-[32px] snap-start transition-all font-semibold ${
                        isSelected
                          ? 'text-white bg-[#A3BC6D] w-40 rounded-[32px] shadow-lg'
                          : 'text-[#CCCCCC] w-40'
                      }`}
                    >
                      {age}
                    </div>
                  );
                })}
                
                <div className="h-[80px]" />
              </div>
            </div>

            
            <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[#FAF5F2]/90 via-[#FAF5F2]/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#FAF5F2]/90 via-[#FAF5F2]/50 to-transparent pointer-events-none" />
          </div>

          <div className="w-full max-w-md mt-6">
            <button
              onClick={() => {
              setNoAnswer(true);
              setAnswers((prev) => ({ ...prev, age: 'no_answer' }));
            }}

              className={`w-full flex justify-center items-center bg-[#E6D3ED] text-[#9B5EC2] font-medium py-4 rounded-[32px] ${
                noAnswer ? 'ring-2 ring-[#9B5EC2]' : ''
              }`}
            >
              Préfère ne pas répondre
              <X size={20} className="ml-2" />
            </button>
          </div>
        </>
      )}

     {step === 4 && (
  <>
    <div className="w-full max-w-md text-center mb-12">
      <h2 className="text-2xl font-bold text-[#42210B] leading-snug">
        Comment qualifierais-tu la qualité de ton sommeil ?
      </h2>
    </div>

    <div className="relative flex flex-col items-center w-full max-w-md px-8">
      <div
        className="relative flex h-[500px] w-full"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Barre verticale */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-[#EEEEEE] rounded-full" />

        {/* Labels + points */}
        {[
          { label: 'Mode Koala', hours: '7-9 HEURES', emoji: '😴' },
          { label: 'Pile poil', hours: '6-7 HEURES', emoji: '🙂' },
          { label: 'Pas assez', hours: '5 HEURES', emoji: '😐' },
          { label: 'Zombie', hours: '3-4 HEURES', emoji: '🙁' },
          { label: 'Survie', hours: '< 3 HEURES', emoji: '😵' }
        ].map((item, i) => (
          <div 
            key={i}
            className={`absolute left-0 right-0 flex items-center justify-between transition-opacity duration-200 ${
              Math.abs(i + 1 - sleepQuality) < 0.5 ? 'opacity-100' : 'opacity-50'
            }`}
            style={{ top: `${i * 25}%` }}
          >
            {/* Titre à gauche avec padding réduit */}
            <div className="text-left pl-2">
              <h3 className="text-md font-bold text-[#42210B]">{item.label}</h3>
              <span className="text-xs text-gray-400">{item.hours}</span>
            </div>

            {/* Emoji à droite avec padding maintenu */}
            <div className="text-2xl pr-4">{item.emoji}</div>
          </div>
        ))}

        {/* Curseur draggable */}
        <div
          className="absolute z-10 cursor-pointer left-1/2 -translate-x-1/2"
          style={{
            top: `${((sleepQuality - 1) * 25)}%`,
            transition: 'top 0.2s ease-out'
          }}
        >
          <div className="w-[32px] h-[32px] bg-[#F97316] rounded-full flex items-center justify-center shadow-lg">
            <Code className="text-white transform rotate-90" size={16} />
          </div>
          
        </div>
      </div>
    </div>
  </>
)}

      {/* Step 5 */}
      {step === 5 && (
  <div className="flex flex-col items-center px-4">
    <div className="text-right w-full mb-8">
      <span className="text-gray-500">5 sur 5</span>
    </div>

    <h2 className="text-3xl font-bold text-center mb-12">
      Quel est le niveau de ton stress quotidien ?
    </h2>

    <div className="text-8xl font-bold text-center mb-16 transition-all duration-300">
      {stressLevel ?? '0'}
    </div>

    <div className="flex justify-between items-center w-full max-w-md mb-16">
      {[1, 2, 3, 4, 5].map((number) => (
        <button
          key={number}
          onClick={() => {
            setStressLevel(number);
            setAnswers(prev => ({
              ...prev,
              stress: {
                value: number,
                label: getStressLabel(number),
              },
            }));
          }}
          className={`w-12 h-12 rounded-full text-lg font-semibold transition
            ${stressLevel === number 
              ? 'bg-[#E8935D] text-white' 
              : 'bg-gray-200 text-gray-600'}`}
        >
          {number}
        </button>
      ))}
    </div>

    <p className="text-xl text-center mb-12 min-h-[1.5em] transition-opacity duration-300">
      {getStressLabel(stressLevel)}
    </p>
  </div>
)}


      {/* Bouton continuer modifié */}
      <div className="fixed bottom-5 left-0 right-0 flex justify-center px-4">
        <button
          onClick={handleNext}
          disabled={isLoading || (step === 0 && (!formData.email || !formData.password || !formData.confirmPassword))}
          className={`w-[200px] max-w-md font-semibold py-3 px-6 rounded-full transition
            ${isLoading || (step === 0 && (!formData.email || !formData.password || !formData.confirmPassword))
              ? 'bg-black cursor-not-allowed text-white'
              : 'bg-[#A67DB9] hover:bg-[#956BA7] text-white'}`}
        >
          {isLoading ? 'Chargement...' : step === 5 ? 'Terminer' : step === 0 ? `S'inscrire` : 'Continuer →'}
        </button>
      </div>
    </div>
  );
}
