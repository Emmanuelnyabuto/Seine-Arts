import React from 'react';
import './PortfolioPage.css';

const portfolios = [
  { title: 'Photography Portfolio', description: 'Capturing life through the lens.', img: 'photography.jpg' },
  { title: 'Videography Portfolio', description: 'Telling stories through motion.', img: 'videography.jpg' },
  { title: 'Sound Engineering Portfolio', description: 'Mastering the art of sound.', img: 'sound-engineering.jpg' },
  { title: 'Graphic Design Portfolio', description: 'Bringing creativity to life.', img: 'graphic-design.jpg' },
  { title: 'Software Engineering Portfolio', description: 'Crafting custom software solutions.', img: 'software-engineering.jpg' }
];

const PortfolioPage = () => {
  return (
    <div className="portfolio-container">
      <h2>Our Portfolios</h2>
      <div className="portfolio-grid">
        {portfolios.map((portfolio, index) => (
          <div key={index} className="portfolio-card">
            <img src={portfolio.img} alt={portfolio.title} />
            <h3>{portfolio.title}</h3>
            <p>{portfolio.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
