const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  foundationName: {
    type: String,
    required: [true, 'Foundation name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  logoUrl: {
    type: String,
    required: [true, 'Logo URL is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxLength: [200, 'Address cannot exceed 200 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\d\s\+\-\(\)]{10,20}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  copyrightText: {
    type: String,
    default: '© 2023 All Rights Reserved',
    trim: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Footer', footerSchema);