import React, { useEffect } from 'react';
import axios from 'axios';

const Payment = ({ amount, currency }) => {
  useEffect(() => {
    window.paypal.Buttons({
      createOrder: async (data, actions) => {
        // Call backend to create the order
        const res = await axios.post('/api/payments/create-order', {
          amount: amount,
          currency: currency,
        });

        return res.data.id;  // Return the order ID
      },
      onApprove: async (data, actions) => {
        // Capture the payment after approval
        const res = await axios.post('/api/payments/capture-order', {
          orderID: data.orderID,
        });

        alert('Payment completed successfully!');
      },
      onError: (err) => {
        console.error(err);
        alert('An error occurred during payment.');
      },
    }).render('#paypal-button-container');
  }, [amount, currency]);

  return <div id="paypal-button-container"></div>;
};

export default Payment;
