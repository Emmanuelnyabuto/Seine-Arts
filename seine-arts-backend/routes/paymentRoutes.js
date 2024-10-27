const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const paypal = require('@paypal/checkout-server-sdk');

const router = express.Router();

// PayPal setup using environment variables
const Environment = paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET));

// Route to create a PayPal order
router.post('/create-paypal-order', protect, async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId).populate('portfolio');
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '100.00' // Update based on your service cost
      },
      description: `Service for ${order.portfolio.title}`,
    }],
  });

  try {
    const createOrderResponse = await paypalClient.execute(request);
    res.status(201).json({ id: createOrderResponse.result.id });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ message: 'PayPal order creation failed' });
  }
});

// Route to capture PayPal payment after approval
router.post('/capture-paypal-order', protect, async (req, res) => {
  const { orderId, paypalOrderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
  request.requestBody({});

  try {
    const captureOrderResponse = await paypalClient.execute(request);
    
    order.status = 'Paid';
    await order.save();

    res.status(200).json({ message: 'Payment captured successfully', order: captureOrderResponse });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    res.status(500).json({ message: 'PayPal order capture failed' });
  }
});

module.exports = router;
