const express = require('express');
const { processPayment, capturePayment } = require('../controllers/paymentController');

const router = express.Router();

// Route to create an order (initial payment request)
router.post('/create-order', processPayment);

// Route to capture the payment after user approval
router.post('/capture-order', capturePayment);

module.exports = router;
