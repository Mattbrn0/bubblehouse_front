import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function JeuCarousel() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase
        .from("exercice")
        .select("*")
        .eq("type", "Meditation");

      if (error) throw error;
      setExercises(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="w-full px-4">
      <Swiper
        spaceBetween={12}
        slidesPerView={3}
        className="w-full"
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
        }}
      >
        {exercises.map((meditation) => (
          <SwiperSlide key={meditation.id}>
            <div className="flex justify-center items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-white">
                <img
                  src={meditation.image_url}
                  alt={meditation.nom}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
