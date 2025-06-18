import { Home, MapPin, User, Gamepad2} from "lucide-react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

function NavIcon({ icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded-full transition-colors cursor-pointer ${
        active
          ? "bg-purple-100 text-purple-800 shadow"
          : "text-gray-500 hover:text-purple-500"
      }`}
    >
      {icon}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center p-4 rounded-t-3xl shadow-md border-t">
      <NavIcon 
        icon={<Home />} 
        active={location.pathname === '/home-page'} 
        onClick={() => navigate('/home-page')}
      />
      <NavIcon 
        icon={<MapPin />} 
        active={location.pathname === '/interactive-map'} 
        onClick={() => navigate('/interactive-map')}
      />
      <NavIcon 
        icon={<User />} 
        active={location.pathname === '/profile'} 
        onClick={() => navigate('/profile')}
      />
      <NavIcon
        icon={<Gamepad2 />}
        active={location.pathname === '/settings'} 
        onClick={() => navigate('/settings')}
      />
    </footer>
  );
}

NavIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};