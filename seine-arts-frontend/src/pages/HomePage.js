import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Optional for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Seine Arts</h1>
        <p>Your platform for photography, videography, sound engineering, graphic design, and software engineering services.</p>
      </header>

      <section className="services-intro">
        <h2>Our Services</h2>
        <div className="services">
          <div className="service-card">
            <h3>Photography</h3>
            <p>Capture your moments with our professional photography services.</p>
          </div>
          <div className="service-card">
            <h3>Videography</h3>
            <p>High-quality videography for events, promotions, and more.</p>
          </div>
          <div className="service-card">
            <h3>Sound Engineering</h3>
            <p>Expert sound engineering for your music, podcasts, and films.</p>
          </div>
          <div className="service-card">
            <h3>Graphic Design</h3>
            <p>Creative designs that bring your ideas to life.</p>
          </div>
          <div className="service-card">
            <h3>Software Engineering</h3>
            <p>Custom software solutions to meet your business needs.</p>
          </div>
        </div>
        <Link to="/portfolios" className="cta-button">View Our Portfolios</Link>
      </section>
    </div>
  );
};

export default HomePage;
