const { verifyToken } = require("../../middleware/auth"); // Adjust path if needed
const AdminUser = require("../models/AdminUser");
const createError = require('http-errors');

const isAdmin = async (req, res, next) => {
  let token;

  // Option 1: Get token from Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      return next(createError(401, "Not authorized, token malformed"));
    }
  }

  // Option 2: Get token from HTTP-only cookie (if you chose this in postLogin)
  if (!token && req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  if (!token) {
    return next(createError(401, "Not authorized, no token"));
  }

  try {
    const decoded = verifyToken(token);
    req.admin = await AdminUser.findById(decoded.id).select("-password"); // Exclude password for security
    next();
  } catch (error) {
    console.error(error);
    return next(createError(401, "Not authorized, token failed"));
  }
};

module.exports = { isAdmin };