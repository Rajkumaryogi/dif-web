const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");

// Admin login
router.get("/login", adminController.getLogin);
router.post("/login", adminController.postLogin);
router.get("/forget-password", adminController.getForgetPass);
router.post("/forget-password", adminController.postForgetPass);
router.get("/reset-password/:token", adminController.getResetPassword);
router.post("/reset-password/:token", adminController.postResetPassword);

// Admin dashboard (protected)
router.get("/dashboard", adminController.getDashboard);
router.get("/admindashboard", adminController.getAdminDashboard);

// Admin logout
router.get("/logout", adminController.logout);


// Other admin routes...
//socialIcon
const socialIconRoutes = require('./socialIconRoutes');
router.use("/socialIconsAdmin", isAdmin, socialIconRoutes);

//HeroSlide
const heroSlideRoutes = require("./heroSlideRoutes");
router.use("/heroSlideAdmin", isAdmin, heroSlideRoutes);

//Mission Vision
const missionVisionRoutes = require("./missionVisionAdminRoutes");
router.use("/mission-vision", isAdmin, missionVisionRoutes);

//Contact Cards 
const contactCardRoutes = require("./contactCardAdminRoutes");
router.use("/contact-cards", isAdmin, contactCardRoutes);

const adminUserRoutes = require("./adminUserRoutes");
router.use("/admin-users", isAdmin, adminUserRoutes);
module.exports = router;
