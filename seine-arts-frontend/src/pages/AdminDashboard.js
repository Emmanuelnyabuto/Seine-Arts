// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [assignSuccess, setAssignSuccess] = useState('');
  const [assignError, setAssignError] = useState('');

  // Fetch data on load
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };

    const fetchProfessionals = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/api/users?role=professional`, config);
        setProfessionals(data);
      } catch (error) {
        console.error('Error fetching professionals', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/api/orders`, config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchServices();
    fetchProfessionals();
    fetchOrders();
  }, []);

  const handleFileChange = (e) => {
    setMedia(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!selectedService) {
      setUploadError('Please select a service category');
      return;
    }

    const formData = new FormData();
    formData.append('serviceCategory', selectedService);
    formData.append('description', description);
    media.forEach((file) => formData.append('media', file));

    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post(`${API_BASE_URL}/api/portfolios/upload`, formData, config);
      setUploadSuccess('Portfolio uploaded successfully');
      setUploadError('');
      setDescription('');
      setMedia([]);
      setSelectedService('');
    } catch (error) {
      console.error('Error uploading portfolio:', error);
      setUploadError('Error uploading portfolio. Please try again.');
      setUploadSuccess('');
    }
  };

  const handleAssignProfessional = async (orderId, professionalId) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${API_BASE_URL}/api/orders/${orderId}/assign`, { professionalId }, config);
      setAssignSuccess('Order assigned successfully');
      setAssignError('');

      // Refresh orders after assignment
      const updatedOrders = await axios.get(`${API_BASE_URL}/api/orders`, config);
      setOrders(updatedOrders.data);
    } catch (error) {
      console.error('Error assigning professional:', error);
      setAssignError('Failed to assign professional. Please try again.');
      setAssignSuccess('');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Upload Portfolio Section */}
      <section>
        <h2>Upload Portfolio</h2>
        <div>
          <label htmlFor="service">Service Category:</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select a Service</option>
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Portfolio description"
          ></textarea>
        </div>

        <div>
          <label htmlFor="media">Media:</label>
          <input type="file" id="media" onChange={handleFileChange} multiple />
        </div>

        <button onClick={handleUpload}>Upload Portfolio</button>
        {uploadSuccess && <p style={{ color: 'green' }}>{uploadSuccess}</p>}
        {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      </section>

      {/* Manage Orders Section */}
      <section>
        <h2>Manage Orders</h2>
        <div className="order-list">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="order-item">
                <p><strong>Service:</strong> {order.service}</p>
                <p><strong>Sub-Service:</strong> {order.subService}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Assigned Professional:</strong> {order.assignedProfessional ? order.assignedProfessional.name : 'Not Assigned'}</p>
                <label htmlFor={`professional-${order._id}`}>Assign Professional:</label>
                <select
                  id={`professional-${order._id}`}
                  onChange={(e) => handleAssignProfessional(order._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select a Professional</option>
                  {professionals.map((prof) => (
                    <option key={prof._id} value={prof._id}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </div>
            ))
          ) : (
            <p>No orders available</p>
          )}
        </div>
        {assignSuccess && <p style={{ color: 'green' }}>{assignSuccess}</p>}
        {assignError && <p style={{ color: 'red' }}>{assignError}</p>}
      </section>
    </div>
  );
};

export default AdminDashboard;
