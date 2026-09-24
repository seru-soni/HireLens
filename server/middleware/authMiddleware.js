const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Retrieve token from HttpOnly cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, please log in.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`[Auth Middleware] JWT verification failed: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.',
    });
  }
};

module.exports = { protect };
