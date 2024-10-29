const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subServices: {
      type: [String], // Array of strings for sub-services
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
