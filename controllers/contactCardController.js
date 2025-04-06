const ContactCard = require('../models/ContactCard');

exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await ContactCard.find().sort({ order: 1 });
    
    if (!teamMembers || teamMembers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No team members found'
      });
    }

    res.status(200).json({
      success: true,
      data: teamMembers
    });
  } catch (err) {
    console.error('Error fetching team members:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching team members'
    });
  }
};

exports.getTeamMembersForPage = async () => {
  try {
    return await ContactCard.find().sort({ order: 1 }).lean();
  } catch (err) {
    console.error('Error fetching team members:', err);
    return null;
  }
};

//Admin