const mongoose = require("mongoose");

const SocialIconSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    iconClass: { type: String, required: true }, // e.g., "fa-brands fa-facebook"
    color : { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model("SocialIcon", SocialIconSchema);
