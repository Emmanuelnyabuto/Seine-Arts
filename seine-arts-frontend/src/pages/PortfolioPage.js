import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Photography');
  
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/portfolio?category=${selectedCategory}`);
        setPortfolios(data);
      } catch (error) {
        console.error('Error fetching portfolios', error);
      }
    };

    fetchPortfolios();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Portfolios</h1>
      <div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="Photography">Photography</option>
          <option value="Videography">Videography</option>
          <option value="Sound Engineering">Sound Engineering</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>
      </div>

      <div className="portfolio-list">
        {portfolios.map((portfolio) => (
          <div key={portfolio._id} className="portfolio-item">
            <h2>{portfolio.title}</h2>
            <p>{portfolio.description}</p>
            <button onClick={() => handleOrderService(portfolio._id)}>Order Service</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Handle ordering service for the selected portfolio
const handleOrderService = async (portfolioId) => {
  try {
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.post(`${API_BASE_URL}/api/orders`, { portfolioId }, config);
    alert('Service ordered successfully');
  } catch (error) {
    console.error('Error ordering service', error);
  }
};

export default PortfolioPage;
