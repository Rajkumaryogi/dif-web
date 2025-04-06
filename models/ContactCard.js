const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema({
  name : { type: String, required: true },
  url: { type: String, required: true },
  color : { type: String, required: true }
});

const contactCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  designation: { type: String },
  imageUrl: { type: String, default: "/images/default-avatar.jpg" },
  email: { type: String },
  phone: { type: String },
  department: { type: String },
  socialLinks: [socialLinkSchema],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("ContactCard", contactCardSchema);