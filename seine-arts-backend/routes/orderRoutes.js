const express = require('express');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

// Create a new order
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { service, subService } = req.body;

    if (!service || !subService) {
      res.status(400);
      throw new Error('Service and sub-service are required');
    }

    const order = new Order({
      user: req.user._id,
      service,
      subService,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  })
);

module.exports = router;
