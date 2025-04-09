const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");
const socialIconRoutes = require('./socialIconRoutes');

// Admin login
router.get("/login", adminController.getLogin);
router.post("/login", adminController.postLogin);

// Admin dashboard (protected)
router.get("/dashboard", isAdmin, adminController.getDashboard);

// Admin logout
router.get("/logout", isAdmin, adminController.logout);


// Other admin routes...
router.use('/socialIconsAdmin', isAdmin, socialIconRoutes);

module.exports = router;
