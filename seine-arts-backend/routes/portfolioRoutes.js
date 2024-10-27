const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Process payment for an order
router.post('/', protect, async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (order && order.status === 'Pending') {
    const payment = new Payment({
      client: req.user._id,
      order: orderId,
      amount: 100, // Sample amount, change as needed
      status: 'Completed',
    });

    await payment.save();
    order.status = 'Paid';
    await order.save();

    res.status(201).json({ message: 'Payment successful' });
  } else {
    res.status(404).json({ message: 'Order not found or already paid' });
  }
});

module.exports = router;
