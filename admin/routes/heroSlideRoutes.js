const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroSlideAdminController");

// GET all slides
router.get("/", heroController.getAllSlides);

// GET form to add slide
router.get("/create", heroController.renderCreateSlide);

// POST create slide
router.post("/create", heroController.createSlide);

// GET edit slide
router.get("/edit/:id", heroController.renderEditSlide);

// POST update slide
router.post("/edit/:id", heroController.updateSlide);

// DELETE slide
router.post("/delete/:id", heroController.deleteSlide);

// TOGGLE isActive
router.post("/toggle/:id", heroController.toggleSlideStatus);

module.exports = router;
