"use strict";

var express = require("express");

var router = express.Router();

var adminController = require("../controllers/adminController"); // Admin login page


router.get("/login", adminController.renderLogin); // Admin dashboard

router.get("/dashboard", adminController.renderDashboard);
module.exports = router;