const express = require('express');
const router = express.Router();
const {
  getSocialIcons,
  createSocialIcon,
  updateSocialIcon,
  deleteSocialIcon
} = require('../controllers/socialIconController');

// CRUD Routes
router.get('/', getSocialIcons);
router.post('/', createSocialIcon);
router.put('/:id', updateSocialIcon);
router.delete('/:id', deleteSocialIcon);

module.exports = router;