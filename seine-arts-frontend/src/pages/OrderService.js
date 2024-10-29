// OrderService.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const OrderService = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/services/${serviceId}`);
        setService(data);
      } catch (error) {
        console.error('Error fetching service details', error);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const orderData = { service: serviceId };
      await axios.post(`${API_BASE_URL}/api/orders`, orderData, config);
      setOrderSuccess('Order placed successfully!');
      setOrderError('');
    } catch (error) {
      setOrderError('Error placing order. Please try again.');
      setOrderSuccess('');
    }
  };

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <div className="order-service-container">
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <ul>
        {service.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <button onClick={handleOrder}>Place Order</button>
      {orderSuccess && <p style={{ color: 'green' }}>{orderSuccess}</p>}
      {orderError && <p style={{ color: 'red' }}>{orderError}</p>}
    </div>
  );
};

export default OrderService;
