import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ChatButton from "@/components/ChatButton";
import Navbar from "../components/Navbar";

export default function PageJeux() {
  const [jeux, setJeux] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJeux();
  }, []);

  const fetchJeux = async () => {
    try {
      const { data, error } = await supabase
        .from("jeux")
        .select("*")
        .eq("type", "anti-stress");

      if (error) throw error;
      setJeux(data);
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
        <h1 className="mt-6 text-2xl">Votre espace jeux</h1>
        <h2 className="mt-2 text-sm">Des jeux anti-stress pour vous détendre</h2>
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
            {jeux.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-xl p-3 shadow flex items-center space-x-4"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-green-200">
                  <img
                    src={game.image_url}
                    alt={game.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[#333] font-medium">{game.nom}</div>
                
              </div>
            ))}
            
          </div>
        )}
         <ChatButton
        className="fixed bottom-15 right-4 shadow-lg"
        onClick={() => navigate("/chat")}
      />
      </main>
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow">
              <Navbar />
            </nav>
    </div>
    
  );
}
