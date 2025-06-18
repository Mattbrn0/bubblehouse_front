import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ChatButton from "@/components/ChatButton";
import MeditationCarousel from "../components/MeditationCarousel";
import PlanJournalier from "../components/PlanJournalier";
import JeuCarousel from "../components/JeuCarousel";

export default function Accueil() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF5F2] flex flex-col relative">
      <div className="flex-1 pb-20 overflow-y-auto">
        {/* Header */}
        <header className="bg-purple-500 rounded-b-[48px] p-6 text-white text-center shadow-md">
          <h1 className="mt-6 text-2xl">
            {/* {prenom ? `Bienvenue ${prenom} !` : "Bienvenue !"} */}
            Bienvenue chez BubbleHouse !
          </h1>
          <blockquote className="mt-4 bg-[#71974E] text-white text-sm p-4 rounded-lg shadow-inner italic">
            « La méditation est un moyen essentiel de purifier et de calmer l&apos;esprit, et donc de rajeunir le corps »
            <span className="block mt-2 text-right text-xs font-poppins">
              – Deepak Chopra
            </span>
          </blockquote>
        </header>

        {/* Sections */}
        <main className="pt-4 space-y-6">
            <div className="flex justify-between items-center px-4 mb-4">
              <h2 className="text-xl font-semibold text-[#42210B]">
                Nos méditations
              </h2>
              <span className="text-[#A67DB9]">Voir tout</span>
            </div>
            <MeditationCarousel />
             <div className="flex justify-between items-center px-4 mb-4">
              <h2 className="text-xl font-semibold text-[#42210B]">
                Plans journaliers
              </h2>
              <span className="text-[#A67DB9]">Voir tout</span>
            </div>
            <PlanJournalier />
            <div className="flex justify-between items-center px-4 mb-4">
              <h2 className="text-xl font-semibold text-[#42210B]">
                jeux anti-stress
              </h2>
              <span className="text-[#A67DB9]">Voir tout</span>
            </div>
            <JeuCarousel />
        </main>
      </div>

      {/* Chat Button */}
      <ChatButton onClick={() => navigate("/chat")} />

      {/* Navbar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow">
        <Navbar />
      </nav>
    </div>

  );
}
