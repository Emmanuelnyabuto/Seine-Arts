import React from 'react';
import './ServicesPage.css';

const services = [
  {
    title: 'Photography',
    description: 'Capture your moments with our professional photography services.',
    image: '/images/photography.jpg',
  },
  {
    title: 'Videography',
    description: 'High-quality videography for events, promotions, and more.',
    image: '/images/videography.jpg',
  },
  {
    title: 'Sound Engineering',
    description: 'Expert sound engineering for your music, podcasts, and films.',
    image: '/images/sound_engineering.jpg',
  },
  {
    title: 'Graphic Design',
    description: 'Creative designs that bring your ideas to life.',
    image: '/images/graphic_design.jpg',
  },
  {
    title: 'Software Engineering',
    description: 'Custom software solutions to meet your business needs.',
    image: '/images/software_engineering.jpg',
  },
  {
    title: 'Web Development',
    description: 'End-to-end web development services for your digital needs.',
    image: '/images/web_development.jpg',
  },
];

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            <img src={service.image} alt={service.title} className="service-image" />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
