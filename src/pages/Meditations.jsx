import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ChatButton from "../components/chatButton";
import Navbar from "../components/Navbar";

export default function PageMeditation() {
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeditations();
  }, []);

  const fetchMeditations = async () => {
    try {
      const { data, error } = await supabase
        .from("exercice")
        .select("*")
        .eq("type", "Meditation");

      if (error) throw error;
      setMeditations(data);
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
        <h1 className="mt-6 text-1xl">Découvrez toutes nos méditations</h1>
        <blockquote className="mt-4 bg-[#71974E] text-white text-sm p-4 rounded-lg shadow-inner italic">
          “ La méditation n&apos;est pas une évasion mais une rencontre sereine
          avec la réalité.”
        </blockquote>
      </header>

      {/* Liste des méditations */}
      <main
        className="overflow-y-auto px-4 pt-[270px] pb-4 h-full"
        style={{ maxHeight: "100vh" }}
      >
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {meditations.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-xl p-3 shadow flex items-center space-x-4"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-green-200">
                  <img
                    src={med.image_url}
                    alt={med.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[#333] font-medium">{med.nom}</div>
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
