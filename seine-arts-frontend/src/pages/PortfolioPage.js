import React, { useEffect, useState } from 'react';
import { fetchPortfolioItems } from '../services/contentful';

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const loadPortfolios = async () => {
      const items = await fetchPortfolioItems();
      setPortfolioItems(items);
    };

    loadPortfolios();
  }, []);

  return (
    <div>
      <h1>Our Portfolio</h1>
      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <div key={item.sys.id} className="portfolio-item">
            <h2>{item.fields.title}</h2>
            <p>{item.fields.description}</p>
            {item.fields.images && item.fields.images.map((image, index) => (
              <img key={index} src={image.fields.file.url} alt={item.fields.title} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
