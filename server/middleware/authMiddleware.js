const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    // The token is in the format "Bearer <token>", so we split it
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    
    // Add the user payload (id, name, role) to the request object
    req.user = decoded.user;
    next(); // Move on to the next function (the route handler)
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};
