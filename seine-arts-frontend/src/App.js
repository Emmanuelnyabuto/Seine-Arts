import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Profile from './pages/Profile';
import PortfolioPage from './pages/PortfolioPage';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
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
          <Route path="/login" element={<LoginPage />} /> {/* Login page */}
          <Route path="/signup" element={<SignupPage />} /> {/* Signup page */}
          <Route path="/portfolios" element={<PortfolioPage />} /> {/* Portfolio page */}
          <Route path="/contact" element={<ContactPage />} /> {/* Contact page */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/profile" element={<Profile />} /> {/* Profile page */}

          {/* Admin route */}
          {user && user.role === 'admin' ? (
            <Route path="/admin" element={<AdminDashboard />} />
          ) : null}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
