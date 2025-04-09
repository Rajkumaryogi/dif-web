const mongoose = require("mongoose");

const SocialIconSchema = new mongoose.Schema({
    order: { type: Number, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    iconClass: { type: String, required: true }, // e.g., "fa-brands fa-facebook"
    visibility : { type: Boolean, default: true }, //added this for admin user
    color : { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model("SocialIcon", SocialIconSchema);
