import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ClientDashboard = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  // Fetch portfolios on load
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/portfolios`);
        setPortfolios(data);
      } catch (error) {
        console.error('Error fetching portfolios', error);
      }
    };

    fetchPortfolios();
  }, []);

  // Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };

    fetchServices();
  }, []);

  // Handle placing an order
  const handleOrder = async () => {
    if (!selectedService) {
      setOrderError('Please select a service to order');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const orderData = { service: selectedService };
      await axios.post(`${API_BASE_URL}/api/orders`, orderData, config);
      setOrderSuccess('Order placed successfully!');
      setOrderError('');
    } catch (error) {
      setOrderError('Error placing order. Please try again.');
      setOrderSuccess('');
    }
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <p>Welcome to your client dashboard! Here you can browse portfolios, order services, and make payments.</p>

      <div>
        <h2>Browse Portfolios</h2>
        <div className="portfolio-grid">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio) => (
              <div key={portfolio._id} className="portfolio-card">
                <h3>{portfolio.professional}</h3>
                <p>{portfolio.description}</p>
                <img src={portfolio.image} alt={portfolio.professional} />
              </div>
            ))
          ) : (
            <p>No portfolios available at the moment.</p>
          )}
        </div>
      </div>

      <div>
        <h2>Order Services</h2>
        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>
        <button onClick={handleOrder}>Place Order</button>
        {orderSuccess && <p style={{ color: 'green' }}>{orderSuccess}</p>}
        {orderError && <p style={{ color: 'red' }}>{orderError}</p>}
      </div>
    </div>
  );
};

export default ClientDashboard;
