// models/Order.js

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },
    subService: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // No professional assigned initially
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
