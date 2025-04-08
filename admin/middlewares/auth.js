const { verifyToken } = require('../../config/auth');
const createError = require('http-errors');

const isAdmin = async (req, res, next) => {
  try {
    // 1. Get token from cookie/header
    const token = req.cookies.admin_jwt || req.headers.authorization?.split(' ')[1];
    if (!token) throw createError(401, 'Not authorized');

    // 2. Verify token
    const decoded = verifyToken(token);
    
    // 3. Attach user to request
    req.user = {
      id: decoded.id,
      isSuperAdmin: decoded.isSuperAdmin
    };

    next();
  } catch (error) {
    next(createError(401, 'Not authorized'));
  }
};

module.exports = { isAdmin };