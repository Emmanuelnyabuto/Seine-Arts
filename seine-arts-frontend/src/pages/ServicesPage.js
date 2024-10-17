import React from 'react';
import './ServicesPage.css'; // Import the updated CSS file

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>We offer a wide range of creative services to meet your needs:</p>

      <div className="services-list">
        <div className="service-card">
          <h2>Photography</h2>
          <p>Capture the moments that matter most with our professional photography services for events, portraits, and more.</p>
        </div>

        <div className="service-card">
          <h2>Videography</h2>
          <p>High-quality videography to showcase your events, products, or personal stories with cinematic excellence.</p>
        </div>

        <div className="service-card">
          <h2>Sound Engineering</h2>
          <p>Expert sound engineering services to produce, mix, and master your audio projects for pristine sound quality.</p>
        </div>

        <div className="service-card">
          <h2>Graphic Design</h2>
          <p>Creative and visually stunning graphic designs that bring your ideas to life, from logos to complete branding.</p>
        </div>

        <div className="service-card">
          <h2>Software Engineering</h2>
          <p>Custom software solutions built to meet the needs of your business or personal projects, with an emphasis on performance and scalability.</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
