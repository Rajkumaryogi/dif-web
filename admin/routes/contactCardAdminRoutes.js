const express = require('express');
const router = express.Router();
const upload = require("../../config/multer");
const contactCardController = require('../controllers/contactCardAdminController');

// Admin auth middleware if needed
// const isAdmin = require('../middleware/isAdmin');

router.get('/', contactCardController.listContactCards);
router.get('/add', contactCardController.showAddForm);
router.post('/create', upload.single("image"), contactCardController.createContactCard);
router.get('/edit/:id', contactCardController.showEditForm);
router.post('/edit/:id', upload.single("image"), contactCardController.updateContactCard);
router.get('/delete/:id', contactCardController.deleteContactCard);

module.exports = router;
