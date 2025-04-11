const express = require('express');
const router = express.Router();
const {
  getMissionVisionList,
  renderForm,
  createMissionVision,
  updateMissionVision,
  deleteMissionVision
} = require('../../admin/controllers/missionVisionAdminController');

// List
router.get('/', getMissionVisionList);

// Create Form
router.get('/create', renderForm);
router.post('/create', createMissionVision);

// Edit Form
router.get('/edit/:id', renderForm);
router.post('/edit/:id', updateMissionVision);

// Delete
router.post('/delete/:id', deleteMissionVision);

module.exports = router;
