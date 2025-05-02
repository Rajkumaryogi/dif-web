const ContactCard = require('../../models/ContactCard');
const fs = require("fs");
const path = require("path");

// Middleware to upload images

// List all contact cards
const listContactCards = async (req, res) => {
  const contactCards = await ContactCard.find().sort({ order: 1 });
  res.render('pages/contactCardsAdmin', {
    layout : "dashboard-layout",
    pageTitle: "Our Team",
     contactCards,
     });
};

// Show add form
const showAddForm = (req, res) => {
  res.render('partials/contactCardsAdd&Edit', {
    layout : "dashboard-layout",
    pageTitle: "Add Team Member",
     contactCard: null, // Assuming contactCard is an empty object initially
     });
};

// Handle create
const createContactCard = async (req, res) => {
  try {
    const {
      name, position, designation, email, phone, department, order
    } = req.body;

    const imageUrl = req.file ? "/uploads/contact-cards/" + req.file.filename : undefined;

    const socialLinks = Array.isArray(req.body.socialName)
      ? req.body.socialName.map((name, index) => ({
          name,
          url: req.body.socialUrl[index],
          color: req.body.socialColor[index],
        }))
      : [];

    const newCard = new ContactCard({
      name,
      position,
      designation,
      email,
      phone,
      department,
      order,
      imageUrl,
      socialLinks
    });

    await newCard.save();
    res.redirect("/admin/contact-cards");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating card");
  }
};

// Show edit form
const showEditForm = async (req, res) => {
  const contactCard = await ContactCard.findById(req.params.id);
  res.render('partials/contactCardsAdd&Edit', { 
    layout : "dashboard-layout",
    pageTitle: "Edit Team Member", 
    contactCard, 
});
};

// Handle update
const updateContactCard = async (req, res) => {try {
  const contactCard = await ContactCard.findById(req.params.id);

  if (!contactCard) {
    return res.status(404).send("Contact card not found");
  }

  // Update fields
  contactCard.name = req.body.name;
  contactCard.position = req.body.position;
  contactCard.designation = req.body.designation;
  contactCard.email = req.body.email;
  contactCard.phone = req.body.phone;
  contactCard.department = req.body.department;
  contactCard.order = req.body.order;

  // 🖼️ Handle new image upload
  if (req.file) {
    contactCard.imageUrl = `/uploads/contact-cards/${req.file.filename}`;
  }

  // Save updated card
  await contactCard.save();
  res.redirect("/admin/contact-cards");
} catch (error) {
  console.error("❌ Update error:", error);
  res.status(500).send("Server error");
}
};

// Handle delete
const deleteContactCard = async (req, res) => {
  await ContactCard.findByIdAndDelete(req.params.id);
  res.redirect('/admin/contact-cards');
};

module.exports = {
  listContactCards,
  showAddForm,
  createContactCard,
  showEditForm,
  updateContactCard,
  deleteContactCard
};


