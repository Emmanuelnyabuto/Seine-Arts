import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Photography');
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  // Fetch portfolios based on selected category
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/portfolios?category=${selectedCategory}`);
        setPortfolios(data);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        setOrderError('Failed to fetch portfolios. Please try again later.');
      }
    };

    fetchPortfolios();
  }, [selectedCategory]);

  // Handle ordering service for the selected portfolio
  const handleOrderService = async (portfolioId) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`${API_BASE_URL}/api/orders`, { portfolioId }, config);
      setOrderSuccess('Service ordered successfully');
      setOrderError('');
    } catch (error) {
      console.error('Error ordering service:', error);
      setOrderError('Failed to order service. Please try again.');
      setOrderSuccess('');
    }
  };

  return (
    <div>
      <h1>Portfolios</h1>
      <div>
        <label htmlFor="category-select">Select Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Photography">Photography</option>
          <option value="Videography">Videography</option>
          <option value="Sound Engineering">Sound Engineering</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>
      </div>

      <div className="portfolio-list">
        {portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <div key={portfolio._id} className="portfolio-item">
              <h2>{portfolio.serviceCategory}</h2>
              <p>{portfolio.description}</p>
              <div className="media-container">
                {portfolio.media.map((file, index) => (
                  <div key={index} className="media-item">
                    {file.endsWith('.mp4') || file.endsWith('.webm') ? (
                      <video width="300" height="200" controls>
                        <source src={`${API_BASE_URL}/${file}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={`${API_BASE_URL}/${file}`}
                        alt="Portfolio Media"
                        width="300"
                        height="200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${API_BASE_URL}/placeholder.png`; // Placeholder if image fails to load
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => handleOrderService(portfolio._id)}>Order Service</button>
            </div>
          ))
        ) : (
          <p>No portfolios available for this category.</p>
        )}
        {orderSuccess && <p style={{ color: 'green' }}>{orderSuccess}</p>}
        {orderError && <p style={{ color: 'red' }}>{orderError}</p>}
      </div>
    </div>
  );
};

export default PortfolioPage;
