const AdminUser = require('../models/AdminUser');
const fs = require("fs");
const path = require("path");

// Middleware to upload images

// List all contact cards
const listAdminUsers = async (req, res) => {
  const { department } = req.query;
  const filter = department ? { department } : {};
  const adminUsers = await AdminUser.find(filter).sort({ order: 1 });
  res.render('pages/adminUser', {
    layout : "dashboard-layout",
    pageTitle: "Other Admins",
     adminUsers,
     department
     });
};

// Show add form
const showAddForm = (req, res) => {
  res.render('partials/adminUsersAdd&Edit', {
    layout : "dashboard-layout",
    pageTitle: "Add new admin",
     adminUser: null, // Assuming contactCard is an empty object initially
     });
};

// Create a new admin
const createAdminUser = async (req, res) => {
  try {
    const { name, email, phone, dob, department, position, designation,profileStatus, order } = req.body;
    
    // Handle checkbox values - they will be "true" when checked, undefined when unchecked
    // Handle checkbox values
    const isSuperAdmin = req.body.isSuperAdmin === 'on' || req.body.isSuperAdmin === true;
    const isAdmin = req.body.isAdmin === 'on' || req.body.isAdmin === true;
    
    const adminUser = new AdminUser({
        name,
        email,
        phone,
        dob,
        isSuperAdmin,
        isAdmin,
        department,
        position,
        designation,
        profileStatus: profileStatus || 'Active', // Default to 'Active' if not provided
        order: order || 0,
        password: req.body.password // Make sure to hash this in your pre-save hook
    });

    await adminUser.save();
    res.redirect('/admin/admin-users');
} catch (err) {
    console.error('Error creating admin user:', err);
    res.render('adminUsersAdd&Edit', { 
        layout: 'admin-layout',
        error: err.message,
        adminUser: req.body 
    });
}
};

// Show edit form
const showEditForm = async (req, res) => {
  const adminUser = await AdminUser.findById(req.params.id);
  res.render('partials/adminUsersAdd&Edit', {
    layout : "dashboard-layout",
    pageTitle: "Edit admin details",
    adminUser,
     });
};

//update admin user
const updateAdminUser = async (req, res) => {
  try {
    const { name, email, phone, dob, department, position, designation, profileStatus, order } = req.body;
    
    // Handle checkbox values
    // Handle checkbox values
    const isSuperAdmin = req.body.isSuperAdmin === 'on' || req.body.isSuperAdmin === true;
    const isAdmin = req.body.isAdmin === 'on' || req.body.isAdmin === true;
    
    const adminUser = await AdminUser.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            phone,
            dob,
            isSuperAdmin,
            isAdmin,
            department,
            position,
            designation,
            profileStatus,  // Include profileStatus in update
            order: order || 0,
        },
        { new: true }
    );

    res.redirect('/admin/admin-users');
} catch (err) {
    console.error('Error updating admin user:', err);
    res.render('adminUsersAdd&Edit', { 
        layout: 'admin-layout',
        error: err.message,
        adminUser: req.body 
    });
}
};

// Delete admin user
const deleteAdminUser = async (req, res) => {
  try {
    const adminUser = await AdminUser.findByIdAndDelete(req.params.id);
    
    if (!adminUser) {
      return res.status(404).send('Admin user not found');
    }
    
    res.redirect('/admin/admin-users');
  } catch (err) {
    console.error('Error deleting admin user:', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  listAdminUsers,
  showAddForm,
  createAdminUser,
  showEditForm,
  updateAdminUser,
  deleteAdminUser,
};