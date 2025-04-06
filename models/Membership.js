const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  membershipType: { 
    type: String, 
    required: true,
    enum: ["individual", "organization"] 
  },

  // Common fields
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },

  // Individual-specific fields
  dateOfBirth: { type: Date },
  occupation: { type: String },

  // Organization-specific fields
  organizationName: { type: String },
  organizationType: { type: String },
  website: { type: String },

  // Additional info
  interests: [String],
  hearAboutUs: { type: String },
  comments: { type: String },
  
  // Status
  status: { 
    type: String, 
    default: "pending",
    enum: ["pending", "approved", "rejected"] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Membership", MembershipSchema);