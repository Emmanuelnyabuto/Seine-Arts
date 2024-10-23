import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Contentful client
  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID, // Your Contentful Space ID
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN, // Your Contentful Access Token
  });

  useEffect(() => {
    // Fetch portfolio data from Contentful
    const fetchPortfolios = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'portfolio', // This is your content type ID in Contentful
        });
        setPortfolios(response.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  if (loading) {
    return <div>Loading portfolio...</div>;
  }

  return (
    <div>
      <h1>Our Portfolio</h1>
      <div className="portfolio-grid">
        {portfolios.length === 0 ? (
          <p>No portfolios available at the moment.</p>
        ) : (
          portfolios.map((portfolio) => (
            <div key={portfolio.sys.id} className="portfolio-item">
              <h2>{portfolio.fields.title}</h2>
              <p>{portfolio.fields.description}</p>
              {portfolio.fields.image && (
                <img
                  src={portfolio.fields.image.fields.file.url}
                  alt={portfolio.fields.title}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
