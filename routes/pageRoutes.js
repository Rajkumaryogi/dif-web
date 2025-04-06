const express = require("express");
const router = express.Router();
const { renderPage } = require("../controllers/pageController");

// Handle all pages including index
router.get("/:page?", renderPage);

module.exports = router;