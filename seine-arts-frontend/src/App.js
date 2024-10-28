import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Profile from './pages/Profile';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import ServicesPage from './pages/ServicesPage'; // Ensure ServicesPage is imported
import ProtectedRoute from './components/ProtectedRoute'; // Imported the ProtectedRoute

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Decode token and set user
      const decodedUser = JSON.parse(atob(authToken.split('.')[1])); // Simplified decoding
      setUser(decodedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          <Route path="/contact" element={<ContactPage />} /> {/* Contact page */}
          <Route path="/login" element={<LoginPage />} /> {/* Login page */}
          <Route path="/signup" element={<SignupPage />} /> {/* Signup page */}
          <Route path="/portfolios" element={<PortfolioPage />} /> {/* Portfolio page */}
          <Route path="/profile" element={<Profile />} /> {/* Profile page */}
          <Route path="/services" element={<ServicesPage />} /> {/* Services page */}

          {/* Admin, Professional, and Client protected routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/professional" 
            element={
              <ProtectedRoute user={user} role="professional">
                <ProfessionalDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/client" 
            element={
              <ProtectedRoute user={user} role="client">
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
