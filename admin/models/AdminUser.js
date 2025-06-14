const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const AdminUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validation
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8 
  },
  dob: {
    type: String, // Storing as string in dd/mm/yyyy format
    required: true,
    match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/
  },
  phone: {
    type: String,
    required: true
  },
  isSuperAdmin: { 
    type: Boolean, 
    default: false 
  },
  isAdmin: {
    type: Boolean,
    default: true
  },
  profileStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Locked'],
    default: 'Active'
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  lastLogin: Date
}, { timestamps: true });

// Password hashing before save
AdminUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
AdminUserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('AdminUser', AdminUserSchema);