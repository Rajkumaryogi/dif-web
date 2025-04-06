const Membership = require("../models/Membership");

exports.submitMembership = async (req, res) => {
  try {
    const formData = req.body;
    const newMembership = await Membership.create(formData);
    
    res.status(201).json({
      success: true,
      message: "Membership application submitted successfully",
      data: newMembership
    });
  } catch (error) {
    console.error("Membership submission error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting membership application",
      error: error.message
    });
  }
};

exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: memberships });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching memberships" });
  }
};