const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroSlideAdminController");
const getMulterUpload = require("../../config/multer");

const upload = getMulterUpload('hero-slides');


// GET all slides
router.get("/", heroController.getAllSlides);

// GET form to add slide
router.get("/create", heroController.renderCreateSlide);

// POST create slide
router.post("/create", upload.single('image'), heroController.createSlide);

// GET edit slide
router.get("/edit/:id", heroController.renderEditSlide);

// POST update slide
router.post("/edit/:id", upload.single('image'), heroController.updateSlide);

// DELETE slide
router.post("/delete/:id", heroController.deleteSlide);

// TOGGLE isActive
router.post("/toggle/:id", heroController.toggleSlideStatus);

module.exports = router;
