import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import Mascotte from "../assets/Logo/Icon_FB_V.png";

function Inscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Adresse e-mail invalide");
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      sessionStorage.setItem("inscriptionData", JSON.stringify(formData));
      navigate("/inscription-step1");
    } catch {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
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

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            className="w-full bg-[#435728] text-white py-3 rounded-full font-medium font-poppins"
          >
            S&apos;inscrire
          </button>
        </form>

        <div className="text-center text-sm space-y-1 mt-4 font-poppins">
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
    </div>
  );
}

export default Inscription;
