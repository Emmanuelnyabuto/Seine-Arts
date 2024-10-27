import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const OrderPaymentPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
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

    fetchOrders();
  }, []);

  const handlePayPalPayment = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(`${API_BASE_URL}/api/payments/create-paypal-order`, { orderId }, config);
      setSelectedOrder({ id: data.id, orderId });
    } catch (error) {
      console.error('Error creating PayPal order', error);
    }
  };

  return (
    <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <div>
        <h1>Your Orders</h1>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Service: {order.portfolio.title} - Status: {order.status}
              {order.status === 'Pending' && (
                <button onClick={() => handlePayPalPayment(order._id)}>Pay with PayPal</button>
              )}
            </li>
          ))}
        </ul>
        {selectedOrder && (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: '100.00', // Set the correct value for the service
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              const { orderId } = selectedOrder;
              const token = localStorage.getItem('authToken');
              const config = { headers: { Authorization: `Bearer ${token}` } };
              await axios.post(`${API_BASE_URL}/api/payments/capture-paypal-order`, { orderId, paypalOrderId: data.orderID }, config);
              alert('Payment successful');
              setSelectedOrder(null);
            }}
            onError={(err) => {
              console.error('PayPal Checkout onError:', err);
            }}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default OrderPaymentPage;
