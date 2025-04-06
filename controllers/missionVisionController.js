const MissionVision = require('../models/MissionVision');

exports.getMissionVisionData = async () => {
    try {
        const data = await MissionVision.find().sort({ order:1 }).lean();
        return data || null;
    } catch (err) {
        console.error('Error fetching mission/vision:', err);
        return null;
    }
};