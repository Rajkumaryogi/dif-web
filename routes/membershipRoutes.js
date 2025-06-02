const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');


// Handle form submission
router.post('/submit', membershipController.submitMembership);

module.exports = router;