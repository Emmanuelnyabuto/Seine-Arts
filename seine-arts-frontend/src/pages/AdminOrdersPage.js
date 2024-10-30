// AdminOrdersPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminOrdersPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/api/orders`, config);
        setOrders(data);
      } catch (error) {
        setError('Error fetching orders');
        console.error(error);
      }
    };

    const fetchProfessionals = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/api/users/professionals`, config);
        setProfessionals(data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    fetchOrders();
    fetchProfessionals();
  }, []);

  const assignProfessional = async (orderId, professionalId) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `${API_BASE_URL}/api/orders/${orderId}/assign`,
        { professionalId },
        config
      );
      setOrders(orders.map(order => (order._id === orderId ? { ...order, assignedProfessional: professionalId } : order)));
    } catch (error) {
      console.error('Error assigning professional:', error);
    }
  };

  return (
    <div className="admin-orders">
      <h1>All Orders</h1>
      {error && <p className="error">{error}</p>}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Sub-Service</th>
            <th>Assign Professional</th>
            <th>Assigned Professional</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user ? order.user.name : 'Guest'}</td>
              <td>{order.service}</td>
              <td>{order.subService}</td>
              <td>
                <select
                  onChange={(e) => assignProfessional(order._id, e.target.value)}
                  value={order.assignedProfessional || ''}
                >
                  <option value="">Select Professional</option>
                  {professionals.map(prof => (
                    <option key={prof._id} value={prof._id}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>{order.assignedProfessional ? order.assignedProfessional.name : 'Not Assigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersPage;
