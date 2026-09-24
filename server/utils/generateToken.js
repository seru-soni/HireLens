const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT with minimal required payload (userId and role),
 * and sets a cross-site production-compatible HttpOnly cookie on the response.
 */
const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  // In cross-site production deployments (e.g. Vercel frontend + Render backend),
  // cookies MUST use sameSite: 'none' and secure: true to be accepted across domains.
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };

  res.cookie('token', token, cookieOptions);

  return token;
};

module.exports = generateTokenAndSetCookie;
