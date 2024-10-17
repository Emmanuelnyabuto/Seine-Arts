import React, { useEffect, useState } from 'react';
import { getPortfolios } from '../services/portfolio';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const data = await getPortfolios();
      setPortfolios(data.portfolios);
    };

    fetchPortfolios();
  }, []);

  return (
    <div>
      <h2>Portfolios</h2>
      {portfolios.map((portfolio) => (
        <div key={portfolio._id}>
          <h3>{portfolio.title}</h3>
          <p>{portfolio.description}</p>
          <div>
            {portfolio.images.map((image, idx) => (
              <img key={idx} src={image} alt={`Portfolio ${idx}`} width="200" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
