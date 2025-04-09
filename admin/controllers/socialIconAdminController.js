const SocialIcon = require("../../models/SocialIcon");

// GET: List all social icons
exports.getAllIcons = async (req, res) => {
  const icons = await SocialIcon.find().lean();
  res.render('pages/socialIconsAdmin', {
    icons,
    pageTitle: 'Manage Social Icons',
    layout: 'admin-layout'
  });
  
};

// GET: Render Edit Page
exports.getEditPage = async (req, res) => {
  const icon = await SocialIcon.findById(req.params.id).lean();
  if (!icon) return res.status(404).send("Icon not found");
  res.render('partials/socialIconsEdit', {
    icon,
    pageTitle: 'Edit Social Icon',
    layout: 'admin-layout'
  });
};

// POST: Update Icon
exports.updateIcon = async (req, res) => {
  const { order, name, url, iconClass, visibility, color } = req.body;
  try {
    await SocialIcon.findByIdAndUpdate(req.params.id, { order, name, url, iconClass, visibility, color });
    res.redirect('/admin/socialIconsAdmin');
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed.");
  }
};



// GET: Render Create Page
exports.getCreatePage = (req, res) => {
  res.render('partials/socialIconsCreate', {
     pageTitle: 'Add Social Icon',
     layout: 'admin-layout'
     });
};

// POST: Create New Icon
exports.createIcon = async (req, res) => {
  try {
    const { order, name, url, iconClass, visibility, color } = req.body;
    await SocialIcon.create({ order, name, url, iconClass, visibility, color });
    res.redirect('/admin/socialIconsAdmin');
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add icon.");
  }
};


// POST: Delete Icon
exports.deleteIcon = async (req, res) => {
  try {
    await SocialIcon.findByIdAndDelete(req.params.id);
    res.redirect('/admin/socialIconsAdmin');
  } catch (err) {
    console.error(err);
    res.status(500).send("Delete failed.");
  }
};
