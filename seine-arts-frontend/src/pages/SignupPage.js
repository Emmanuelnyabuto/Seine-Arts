import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SignupPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'client' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/signup`, formData);
      const { token, role } = response.data;
      localStorage.setItem('authToken', token);
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
      setError('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange} required>
        <option value="client">Client</option>
        <option value="professional">Professional</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupPage;
