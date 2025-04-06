const mongoose = require("mongoose");

const MissionVisionSchema = new mongoose.Schema({
    order: { type: Number, required: true },
    heading : { type: String, required: true },
    subheading : { type: String, required: true },
    description : { type: String, required: true }

}, {timestamps: true});

module.exports = mongoose.model("MissionVision", MissionVisionSchema);