const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");

// Admin login
router.get("/login", adminController.getLogin);
router.post("/login", adminController.postLogin);

// Admin dashboard (protected)
router.get("/dashboard", isAdmin, adminController.getDashboard);

// Admin logout
router.get("/logout", isAdmin, adminController.logout);


// Other admin routes...
//socialIcon
const socialIconRoutes = require('./socialIconRoutes');
router.use('/socialIconsAdmin', isAdmin, socialIconRoutes);

//HeroSlide
const heroSlideRoutes = require("./heroSlideRoutes");
router.use("/heroSlideAdmin", isAdmin, heroSlideRoutes);

//Mission Vision
const missionVisionRoutes = require("./missionVisionAdminRoutes");
router.use('/mission-vision', isAdmin, missionVisionRoutes);


module.exports = router;
