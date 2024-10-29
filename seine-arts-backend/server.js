const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); // Import service routes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Optional: Log each incoming request (useful for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes); // Register services route

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
