const express = require('express');
const asyncHandler = require('express-async-handler');
const { protect, admin } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

// Admin: Get all orders
router.get(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('user', 'name email') // Populate user information
        .populate('assignedProfessional', 'name'); // Populate assigned professional information
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  })
);

// Assign professional to an order
router.put(
  '/:id/assign',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { professionalId } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.assignedProfessional = professionalId;
      order.status = 'Assigned';
      await order.save();
      res.json({ message: 'Order assigned successfully', order });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  })
);

// Create a new order
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { service, subService } = req.body;

    if (!service || !subService) {
      return res.status(400).json({ message: 'Service and sub-service are required' });
    }

    try {
      const order = new Order({
        user: req.user._id,
        service,
        subService,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order' });
    }
  })
);

// Get logged-in user's orders
router.get(
  '/myorders',
  protect,
  asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user orders' });
    }
  })
);

module.exports = router;
