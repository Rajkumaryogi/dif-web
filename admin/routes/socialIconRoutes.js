const express = require('express');
const router = express.Router();
const socialIconController = require('../controllers/socialIconAdminController');

// CRUD Routes
router.get('/', socialIconController.getAllIcons);          // Show all icons
router.get('/create', socialIconController.getCreatePage);  // Show add form
router.post('/create', socialIconController.createIcon);    // Handle create
router.get('/edit/:id', socialIconController.getEditPage);  // Show edit form
router.post('/edit/:id', socialIconController.updateIcon);  // Handle update
router.post('/delete/:id', socialIconController.deleteIcon); // Handle delete
router.post('/:id/toggle', socialIconController.toggleVisibility); // Handle Icon visibility toggle


module.exports = router;
