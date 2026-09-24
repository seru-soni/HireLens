const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT with minimal required payload (userId and role),
 * and sets an HttpOnly cookie on the response.
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

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };

  res.cookie('token', token, cookieOptions);

  return token;
};

module.exports = generateTokenAndSetCookie;
