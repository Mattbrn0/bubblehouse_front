import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import InscriptionSteps from './pages/InscriptionSteps';
import ForgotPassword from './pages/forgotpassword';
import ChatInterface from './pages/chatInterface';
import HomePage from './pages/Accueil';
import Profile from './pages/profile';
import InteractiveMap from './pages/InteractiveMap';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/inscription-steps" element={<InscriptionSteps />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/interactive-map" element={<InteractiveMap />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;