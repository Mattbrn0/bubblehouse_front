import { useState } from "react";
import Navbar from "@/components/Navbar";
import ChatButton from "@/components/ChatButton";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prenom: "",
    dateNaissance: "",
    genre: "",
    langue: "",
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  const { prenom, dateNaissance, genre, langue } = formData;

  if (!prenom || !dateNaissance || !genre || !langue) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prenom,
        dob: dateNaissance,
        genre,
        langue,
      }),
    });

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    console.log("Utilisateur créé :", data);
    alert("Profil enregistré avec succès !");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l’enregistrement.");
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-xl font-semibold mb-2 text-gray-800"> 
          Bravo !
        </h1>
        <p className="text-center text-gray-700 mb-6">
          En vous inscrivant, vous avez fait le premier pas vers une vie plus heureuse et plus saine.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              name="prenom"
              type="text"
              value={formData.prenom}
              onChange={handleChange}
              className="mt-1 w-full border-b border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Prénom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
            <input
              name="dateNaissance"
              type="date"
              value={formData.dateNaissance}
              onChange={handleChange}
              className="mt-1 w-full border-b border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Date de naissance"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <div className="flex flex-wrap gap-4">
              {["Femme", "Homme", "Ne préfère pas répondre"].map((option) => (
                <label key={option} className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="radio"
                    name="genre"
                    value={option}
                    checked={formData.genre === option}
                    onChange={handleChange}
                    className="accent-purple-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Langue</label>
            <input
              name="langue"
              type="text"
              value={formData.langue}
              onChange={handleChange}
              className="mt-1 w-full border-b border-purple-400 focus:outline-none focus:border-purple-600 bg-transparent"
              placeholder="Langue"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-purple-400 text-white font-semibold px-8 py-2 rounded-full hover:bg-purple-500 transition"
            >
              Continuer
            </button>
          </div>
        </form>

        <ChatButton onClick={() => navigate("/chat")} />
      </div>

      <Navbar />
    </div>
  );
};

export default Profile;
