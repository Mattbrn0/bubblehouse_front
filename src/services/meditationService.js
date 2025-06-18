const API_URL = import.meta.env.VITE_API_URL;

export const meditationService = {
       async getMeditations() {
              const res = await fetch(`${API_URL}/meditations`);
              if (!res.ok) {
                     throw new Error("Erreur lors de la récupération des méditations");
              }
              return await res.json();
       },
};