import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData);
      const { token, role, user } = response.data; // Expecting `user` data in response
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user._id); // Store user ID for order creation
      setUser(response.data);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'professional') {
        navigate('/professional');
      } else {
        navigate('/client');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
