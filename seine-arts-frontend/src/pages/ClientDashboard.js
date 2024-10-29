import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientDashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ClientDashboard = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedSubService, setSelectedSubService] = useState('');
  const [subServices, setSubServices] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  // Fetch portfolios on load
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/portfolios`);
        setPortfolios(data || []);
      } catch (error) {
        console.error('Error fetching portfolios', error);
      }
    };
    fetchPortfolios();
  }, []);

  // Fetch available services on load
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/services`);
        console.log('Fetched Services:', data);
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };
    fetchServices();
  }, []);

  // Update sub-services when a main service is selected
  useEffect(() => {
    if (selectedService) {
      const service = services.find(service => service.name === selectedService);
      setSubServices(service?.subServices || []);
    } else {
      setSubServices([]);
    }
  }, [selectedService, services]);

  // Handle placing an order
  const handleOrder = async () => {
    if (!selectedService || !selectedSubService) {
      setOrderError('Please select a service and a sub-service to order');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const orderData = { 
        service: selectedService, 
        subService: selectedSubService 
      };
      console.log('Order Data:', orderData);
      const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData, config);
      console.log('Order Response:', response.data);
      setOrderSuccess('Order placed successfully!');
      setOrderError('');
      setSelectedService('');
      setSelectedSubService('');
    } catch (error) {
      console.error('Error placing order:', error.response || error.message);
      setOrderError(error.response?.data?.message || 'Error placing order. Please try again.');
      setOrderSuccess('');
    }
  };

  return (
    <div className="client-dashboard">
      <h1 className="dashboard-title">Client Dashboard</h1>
      <p className="dashboard-description">
        Welcome to your client dashboard! Here you can browse portfolios, order services, and make payments.
      </p>

      <div className="order-section">
        <h2>Order Services</h2>
        
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="service-select"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>

        <select
          value={selectedSubService}
          onChange={(e) => setSelectedSubService(e.target.value)}
          className="service-select"
          disabled={!selectedService || subServices.length === 0}
        >
          <option value="">Select a sub-service</option>
          {subServices.map((subService, index) => (
            <option key={index} value={subService}>
              {subService}
            </option>
          ))}
        </select>

        <button onClick={handleOrder} className="order-button">Place Order</button>
        {orderSuccess && <p className="order-success">{orderSuccess}</p>}
        {orderError && <p className="order-error">{orderError}</p>}
      </div>
    </div>
  );
};

export default ClientDashboard;
