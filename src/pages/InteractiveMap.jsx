import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
  Popup
} from "react-leaflet";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import L from "leaflet";
import { supabase } from "../../supabaseClient";

// Icône par défaut Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Icône personnalisée pour les popups
const popupIcon = L.divIcon({
  className: "",
  html: `
    <div class="relative">
      <div class="w-4 h-4 bg-pink-500 rounded-full animate-ping absolute"></div>
      <div class="w-3 h-3 bg-pink-600 rounded-full relative z-10"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Icône ping animé pour l'utilisateur
const userPingIcon = L.divIcon({
  className: "ping-icon",
  html: `
    <div class="relative">
      <div class="w-4 h-4 bg-purple-500 rounded-full animate-ping absolute top-0 left-0"></div>
      <div class="w-3 h-3 bg-purple-600 rounded-full relative z-10"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function UserLocation({ onUpdate }) {
  const map = useMap();

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        onUpdate?.(coords);
      },
      (err) => {
        console.error("Erreur localisation", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, onUpdate]);

  return null;
}

UserLocation.propTypes = {
  onUpdate: PropTypes.func,
};

export default function InteractiveMap() {
  const [popupList, setPopupList] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    async function fetchPopups() {
      const { data, error } = await supabase
        .from("pop_up")
        .select(`
          id_popup,
          nom,
          description,
          date,
          localisation (
            latitude,
            longitude,
            adresse,
            ville,
            pays
          )
        `);

      if (error) {
        console.error("Erreur Supabase :", error);
      } else {
        const formatted = data
          .filter((item) => item.localisation !== null)
          .map((item) => ({
            lat: item.localisation.latitude,
            lng: item.localisation.longitude,
            nom: item.nom,
            description: item.description,
            date: item.date,
            adresse: item.localisation.adresse,
          }));
        setPopupList(formatted);
      }
    }

    fetchPopups();
  }, []);

  const handlePopupClick = async (popup) => {
    if (!userCoords) return;

    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${userCoords.lng},${userCoords.lat};${popup.lng},${popup.lat}?overview=full&geometries=geojson`
    );
    const json = await response.json();
    if (json.routes && json.routes.length > 0) {
      const coords = json.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRouteCoords(coords);
    }
  };

  return (
    <div className="relative w-screen h-screen">
      

      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[45.75, 4.85]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=FNdTtFSy71UgsCDHNkgkj6MtwtwFonSedYxOqJpuOBG2MojjEJUZPVoXdfC94OIN"
            attribution='<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a> contributors'
          />

          <UserLocation onUpdate={(coords) => setUserCoords(coords)} />

          {/* Marqueurs Popups */}
          {popupList.map((popup, i) => (
            <Marker
              key={`popup-${i}`}
              position={[popup.lat, popup.lng]}
              icon={popupIcon}
              eventHandlers={{
                click: () => handlePopupClick(popup),
              }}
            >
              <Popup>
                <strong>{popup.nom}</strong><br />
                {popup.description}<br />
                <em>{popup.date}</em>
              </Popup>
            </Marker>
          ))}

          {/* Marqueur utilisateur */}
          {userCoords && (
            <Marker position={[userCoords.lat, userCoords.lng]} icon={userPingIcon} />
          )}

          {/* Tracé de l'itinéraire */}
          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="blue" weight={5} />
          )}
        </MapContainer>
      </div>

      {/* Navbar */}
      <div className="absolute bottom-0 left-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
}
