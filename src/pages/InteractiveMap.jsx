import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import ChatButton from "@/components/ChatButton";
import { useNavigate } from 'react-router-dom';

const blueCircleIcon = L.divIcon({
  html: `<div style="
    background-color: #A67DB9;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid white;
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
      <path d="M12 2L15 8H9L12 2ZM12 22C12.5523 22 13 21.5523 13 21V10H11V21C11 21.5523 11.4477 22 12 22Z"/>
    </svg>
  </div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  tooltipAnchor: [16, -28],
  className: 'custom-pin'
});

const InteractiveMap = () => {
  const [popups, setPopups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Chargement des popups
    fetch('https://api.monsite.com/popups') // Remplace avec ton endpoint réel
      .then(res => res.json())
      .then(data => setPopups(data))
      .catch(err => console.error("Erreur lors du chargement des popups :", err));
  }, []);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="relative h-screen w-screen">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full h-24 bg-[#A67DB9] z-[999] rounded-b-3xl flex items-center justify-center text-white text-lg font-semibold">
        Trouvez votre Bulle
      </div>

      {/* Map */}
      <MapContainer
        center={[45.755, 4.845]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Position actuelle (exemple statique ici) */}
        <Marker position={[45.75, 4.85]} icon={blueCircleIcon} />

        {/* Popups dynamiques */}
        {popups.map(popup => (
          <Marker
            key={popup.id_popup}
            position={[
              popup.localisation.latitude,
              popup.localisation.longitude
            ]}
            icon={customIcon}
          >
            <Tooltip
              direction="top"
              offset={[0, -20]}
              opacity={0.9}
              permanent={false}
              className="bg-white px-2 py-1 rounded shadow-lg"
            >
              {popup.nom}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <ChatButton onClick={() => navigate("/chat")} />

      {/* Navbar */}
      <div className="absolute bottom-0 left-0 w-full z-[999]">
        <Navbar />
      </div>
    </div>
  );
};

export default InteractiveMap;
