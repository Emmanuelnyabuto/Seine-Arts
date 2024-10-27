import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [professionals, setProfessionals] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch professionals and portfolios for assignment
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const professionalsData = await axios.get(`${API_BASE_URL}/api/users/professionals`, config);
        const portfoliosData = await axios.get(`${API_BASE_URL}/api/portfolios`, config);
        setProfessionals(professionalsData.data);
        setPortfolios(portfoliosData.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleAssignJob = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const body = { professionalId: selectedProfessional, portfolioId: selectedPortfolio, description };

      await axios.post(`${API_BASE_URL}/api/jobs/assign-job`, body, config);
      setMessage('Job assigned successfully');
    } catch (error) {
      setMessage('Error assigning job');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Assign Job to Professional</h2>
        <select onChange={(e) => setSelectedProfessional(e.target.value)} value={selectedProfessional}>
          <option>Select Professional</option>
          {professionals.map((pro) => (
            <option key={pro._id} value={pro._id}>
              {pro.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedPortfolio(e.target.value)} value={selectedPortfolio}>
          <option>Select Portfolio</option>
          {portfolios.map((portfolio) => (
            <option key={portfolio._id} value={portfolio._id}>
              {portfolio.title}
            </option>
          ))}
        </select>

        <textarea placeholder="Job Description" onChange={(e) => setDescription(e.target.value)} value={description} />

        <button onClick={handleAssignJob}>Assign Job</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
