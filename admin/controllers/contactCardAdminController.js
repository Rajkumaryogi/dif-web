const ContactCard = require('../../models/ContactCard');

// List all contact cards
const listContactCards = async (req, res) => {
  const contactCards = await ContactCard.find().sort({ order: 1 });
  res.render('pages/contactCardsAdmin', {
    layout : "admin-layout",
    pageTitle: "Our Team",
     contactCards,
     });
};

// Show add form
const showAddForm = (req, res) => {
  res.render('partials/contactCardsAdd&Edit', {
    layout : "admin-layout",
    pageTitle: "Add Team Member",
     contactCard: null, // Assuming contactCard is an empty object initially
     });
};

// Handle create
const createContactCard = async (req, res) => {
  await ContactCard.create(req.body);
  res.redirect('/admin/contact-cards');
};

// Show edit form
const showEditForm = async (req, res) => {
  const contactCard = await ContactCard.findById(req.params.id);
  res.render('partials/contactCardsAdd&Edit', { 
    layout : "admin-layout",
    pageTitle: "Edit Team Member", 
    contactCard, 
});
};

// Handle update
const updateContactCard = async (req, res) => {
  await ContactCard.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/contact-cards');
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
