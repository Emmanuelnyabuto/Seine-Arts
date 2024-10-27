const clientOnly = (req, res, next) => {
    if (req.user && req.user.role === 'client') {
      next();
    } else {
      res.status(401).json({ message: 'Not authorized as client' });
    }
  };
  
  module.exports = { clientOnly };
  