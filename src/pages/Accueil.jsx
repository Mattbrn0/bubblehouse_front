import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, MapPin, User } from "lucide-react";

export default function HomePage() {
  const userName = "Alex"; // Exemple dynamique

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pb-20">
      {/* Header */}
      <header className="bg-purple-500 rounded-b-[48px] p-6 text-white text-center shadow-md">
        <div className="text-sm text-left">09:41</div>
        <h1 className="mt-6 text-2xl font-semibold">Bienvenue {userName} !</h1>
        <blockquote className="mt-4 bg-green-800 text-white text-sm p-4 rounded-lg shadow-inner italic">
          « La méditation est un moyen essentiel de purifier et de calmer l'esprit, et donc de rajeunir le corps »
          <span className="block mt-2 text-right text-xs">– Deepak Chopra</span>
        </blockquote>
      </header>

      {/* Content */}
      <main className="p-4 space-y-8">
        <Section title="Plan journalier">
          <CardGrid count={3} />
        </Section>

        <Section title="Nos méditations">
          <div className="grid grid-cols-3 gap-4">
            <Card className="overflow-hidden aspect-square shadow">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
                alt="Méditation"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Card>
            <CardPlaceholder />
            <CardPlaceholder />
          </div>
        </Section>

        <Section title="Nos conseils">
          <CardGrid count={3} />
        </Section>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center p-4 rounded-t-3xl shadow-md border-t">
        <NavIcon icon={<Home />} active />
        <NavIcon icon={<MapPin />} />
        <NavIcon icon={<User />} />
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-sm text-purple-500 hover:underline transition">Voir tout</button>
      </div>
      {children}
    </section>
  );
}

function CardGrid({ count }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <CardPlaceholder key={idx} />
      ))}
    </div>
  );
}

function CardPlaceholder() {
  return (
    <Card className="h-24 bg-gray-300 animate-pulse rounded-xl shadow-sm">
      <CardContent />
    </Card>
  );
}

function NavIcon({ icon, active }) {
  return (
    <div
      className={`p-2 rounded-full transition-colors ${
        active
          ? "bg-purple-100 text-purple-800 shadow"
          : "text-gray-500 hover:text-purple-500"
      }`}
    >
      {icon}
    </div>
  );
}
