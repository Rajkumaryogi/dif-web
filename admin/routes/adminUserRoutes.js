const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');
// const getMulterUpload = require("../../config/multer");

// const upload = getMulterUpload('contact-cards');
// Admin auth middleware if needed
// const isAdmin = require('../middleware/isAdmin');

router.get('/', adminUserController.listAdminUsers);
router.get('/add', adminUserController.showAddForm);
router.post('/create', adminUserController.createAdminUser);
router.get('/edit/:id', adminUserController.showEditForm);
router.post('/edit/:id', adminUserController.updateAdminUser);
router.get('/delete/:id', adminUserController.deleteAdminUser);

module.exports = router;
