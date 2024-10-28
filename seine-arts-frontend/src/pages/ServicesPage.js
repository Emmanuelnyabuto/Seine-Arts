// ServicesPage.js

import React from 'react';
import './ServicesPage.css';

const services = [
  {
    title: 'Photography',
    description: 'Capture your moments with our professional photography services.',
    details: [
      'Event Photography',
      'Portrait Photography',
      'Product Photography',
      'Wedding Photography'
    ],
    image: '/images/photography.jpg',
  },
  {
    title: 'Videography',
    description: 'High-quality videography for events, promotions, and more.',
    details: [
      'Corporate Videography',
      'Event Coverage',
      'Promotional Videos',
      'Documentaries'
    ],
    image: '/images/videography.jpg',
  },
  {
    title: 'Sound Engineering',
    description: 'Expert sound engineering for your music, podcasts, and films.',
    details: [
      'Music Mixing',
      'Podcast Recording',
      'Film Sound Design',
      'Voiceover Recording'
    ],
    image: '/images/sound_engineering.jpg',
  },
  {
    title: 'Graphic Design',
    description: 'Creative designs that bring your ideas to life.',
    details: [
      'Logo Design',
      'Brand Identity',
      'Marketing Materials',
      'Social Media Graphics'
    ],
    image: '/images/graphic_design.jpg',
  },
  {
    title: 'Software Engineering',
    description: 'Custom software solutions to meet your business needs.',
    details: [
      'App Development',
      'System Integration',
      'Data Analysis',
      'Automation Solutions'
    ],
    image: '/images/software_engineering.jpg',
  },
  {
    title: 'Web Development',
    description: 'End-to-end web development services for your digital needs.',
    details: [
      'Front-End Development',
      'Back-End Development',
      'eCommerce Solutions',
      'Website Maintenance'
    ],
    image: '/images/web_development.jpg',
  },
];

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            <img src={service.image} alt={service.title} className="service-image" />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <ul>
              {service.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
