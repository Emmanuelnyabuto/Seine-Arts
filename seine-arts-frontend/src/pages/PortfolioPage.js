import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback for local testing

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/portfolios`);
        setPortfolios(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch portfolios');
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  if (loading) return <p>Loading portfolios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Our Portfolio</h1>
      {portfolios.map((portfolio) => (
        <div key={portfolio._id}>
          <h2>{portfolio.title}</h2>
          <p>{portfolio.description}</p>
          {portfolio.images.map((image, index) => (
            <img key={index} src={image} alt={portfolio.title} style={{ width: '200px' }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PortfolioPage;
