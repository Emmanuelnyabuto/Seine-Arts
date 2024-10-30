// AdminPortfolioUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminPortfolioUpload = () => {
  const [serviceCategory, setServiceCategory] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('serviceCategory', serviceCategory);
    formData.append('description', description);
    files.forEach(file => formData.append('media', file));

    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      await axios.post(`${API_BASE_URL}/api/portfolios`, formData, config);
      setSuccess('Portfolio uploaded successfully!');
      setError('');
    } catch (error) {
      setError('Error uploading portfolio');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Portfolio</h2>
      <input type="text" placeholder="Service Category" value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      <input type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
      <button type="submit">Upload Portfolio</button>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AdminPortfolioUpload;
