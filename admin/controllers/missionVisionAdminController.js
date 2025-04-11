const MissionVision = require('../../models/MissionVision');

// Show all entries
const getMissionVisionList = async (req, res) => {
  const items = await MissionVision.find().sort({ order: 1 });
  res.render('pages/missionVisionAdmin', {
    layout: "admin-layout",
    pageTitle: "Mission & Vision Entries",
     items, 
    });
};

// Show form (create or edit)
const renderForm = async (req, res) => {
  let item = null;
  if (req.params.id) {
    item = await MissionVision.findById(req.params.id);
  }
  res.render('partials/missionVisionAdd&Edit', {
    layout: "admin-layout",
    pageTitle: "Mission & Vision Entries",
     item,
     });
};

// Create new
const createMissionVision = async (req, res) => {
  try {
    const data = { ...req.body };
    await MissionVision.create(data);
    res.redirect('/admin/mission-vision');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating entry');
  }
};

// Update existing
const updateMissionVision = async (req, res) => {
  try {
    await MissionVision.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/mission-vision');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating entry');
  }
};

// Delete
const deleteMissionVision = async (req, res) => {
  try {
    await MissionVision.findByIdAndDelete(req.params.id);
    res.redirect('/admin/mission-vision');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting entry');
  }
};

module.exports = {
  getMissionVisionList,
  renderForm,
  createMissionVision,
  updateMissionVision,
  deleteMissionVision
};
