const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and check for admin role
const adminAuthMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      // Check if user has admin role
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { adminAuthMiddleware };
