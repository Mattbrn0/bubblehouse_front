import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MeditationCarousel() {
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
        slidesPerView={2.2}
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
        {exercises.map((exercise) => (
          <SwiperSlide key={exercise.id}>
            <div className="aspect-square rounded-xl overflow-hidden bg-white">
              <img
                src={exercise.image_url}
                alt={exercise.nom}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
