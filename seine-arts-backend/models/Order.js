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
    paymentMethod: {
      type: String,
      required: false, // Make optional
    },
    totalPrice: {
      type: Number,
      required: false, // Make optional
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
