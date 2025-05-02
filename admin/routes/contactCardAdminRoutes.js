const express = require('express');
const router = express.Router();
const contactCardController = require('../controllers/contactCardAdminController');
const getMulterUpload = require("../../config/multer");

const upload = getMulterUpload('contact-cards');
// Admin auth middleware if needed
// const isAdmin = require('../middleware/isAdmin');

router.get('/', contactCardController.listContactCards);
router.get('/add', contactCardController.showAddForm);
router.post('/create', upload.single("image"), contactCardController.createContactCard);
router.get('/edit/:id', contactCardController.showEditForm);
router.post('/edit/:id', upload.single("image"), contactCardController.updateContactCard);
router.get('/delete/:id', contactCardController.deleteContactCard);

module.exports = router;
