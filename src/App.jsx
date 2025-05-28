import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Inscription from './pages/Inscription';
import InscriptionStep1 from './pages/InscriptionStep1';
import InscriptionStep2 from './pages/InscriptionStep2';
import ForgotPassword from './pages/forgotpassword';
import ChatInterface from './pages/chatInterface';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inscription-step1" element={<InscriptionStep1 />} />
          <Route path="/inscription-step2" element={<InscriptionStep2 />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;