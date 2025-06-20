import PropTypes from "prop-types"; // <-- importer PropTypes
import { FaCalendarDay, FaClock, FaCalendarWeek } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { BsEmojiSmile, BsEmojiNeutral, BsEmojiFrown } from "react-icons/bs";

const moodIcons = {
  good: <BsEmojiSmile className="text-black text-xl" />,
  medium: <BsEmojiNeutral className="text-black text-xl" />,
  bad: <BsEmojiFrown className="text-black text-xl" />,
};

// Exemple de données de l'humeur
const moodData = [
  { day: "Lun", moods: ["bad"] },
  { day: "Mar", moods: ["good"] },
  { day: "Mer", moods: ["medium"] },
  { day: "Jeu", moods: ["bad"] },
  { day: "Ven", moods: ["good"] },
  { day: "Sam", moods: ["good", "medium"] },
  { day: "Dim", moods: ["bad"] },
];

export default function ProgressionDashboard() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg space-y-6">
      {/* Mes progrès */}
      <div>
        <h2 className="text-xl font-semibold text-[#42210B]">
                Mes progrès
              </h2>
        <div className="grid grid-cols-3 gap-3">
          <ProgressCard icon={<FaCalendarDay />} label="Jours" value="27" />
          <ProgressCard icon={<FaClock />} label="Minutes" value="542" />
          <ProgressCard icon={<FaCalendarWeek />} label="Semaines" value="4" />
        </div>
      </div>

      {/* Suivi de l'humeur */}
      <div>
        <div className="flex justify-between items-center text-gray-800 mb-2">
          <h2 className="text-xl font-semibold text-[#42210B]">
                Suivi de l&apos;humeur
              </h2>
          <span className="flex items-center text-sm font-medium">
            Cette semaine <FiChevronRight />
          </span>
        </div>

        {/* Barres */}
        <div className="flex items-end justify-between h-36">
          {moodData.map(({ day, moods }, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <div className="flex flex-col-reverse items-center justify-end bg-gray-300 rounded-md w-6 h-24 relative overflow-visible">
                {moods.map((mood, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{ bottom: `${i * 20 + 4}px` }}
                  >
                    {moodIcons[mood]}
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-700 mt-1">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressCard({ icon, label, value }) {
  return (
    <div className="bg-[#71974E] text-white rounded-lg px-3 py-2 flex flex-col items-center shadow">
      <div className="text-sm">{icon}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

ProgressCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
