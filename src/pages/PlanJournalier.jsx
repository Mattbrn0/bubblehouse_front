import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ChatButton from "../components/ChatButton";
import Navbar from "../components/Navbar";

export default function PagePlan() {
  const [Plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const { data, error } = await supabase
        .from("exercice")
        .select("*")
        .eq("type", "Meditation");

      if (error) throw error;
      setPlan(data);
    } catch (error) {
      console.error("Erreur lors du chargement des méditations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#F4F4F4]">
      {/* Header */}
      <header className="bg-purple-500 fixed top-0 left-0 w-full z-40  text-white rounded-b-3xl px-4 pt-8 pb-8">
        <ChevronLeft
          size={20}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <h1 className="mt-6 text-2xl">Vos plans pour la journée :</h1>
        <h2 className="mt-2 text-sm">{today}</h2>
      </header>

      {/* Liste des plans jourbaliers */}
      <main
        className="overflow-y-auto px-4 pt-[240px] pb-4 h-full"
        style={{ maxHeight: "100vh" }}
      >
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="mt-6 text-2xl">Matin :</h1>
            {Plan.map((planj) => (
              <div
                key={planj.id}
                className="bg-white rounded-xl p-3 shadow flex items-center space-x-4"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-green-200">
                  <img
                    src={planj.image_url}
                    alt={planj.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[#333] font-medium">{planj.nom}</div>
              </div>
            ))}
            <h1 className="mt-6 text-2xl">Après-midi :</h1>
            {Plan.map((planj) => (
              <div
                key={planj.id}
                className="bg-white rounded-xl p-3 shadow flex items-center space-x-4"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-green-200">
                  <img
                    src={planj.image_url}
                    alt={planj.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[#333] font-medium">{planj.nom}</div>
              </div>
            ))}
            <ChatButton
              className="fixed bottom-24 right-4 z-[999] shadow-lg"
              onClick={() => navigate("/chat")}
            />
          </div>
        )}
      </main>
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow">
              <Navbar />
            </nav>
    </div>
  );
}
