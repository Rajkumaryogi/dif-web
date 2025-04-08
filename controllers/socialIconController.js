const SocialIcon = require("../models/SocialIcon");

exports.getSocialIcons = async () => {
    try {
        const socialIcons = await SocialIcon.find().lean();
        // console.log("Social Icons:", socialIcons);
        return socialIcons;
        
    } catch (error) {
        console.error("Error fetching social icons:", error);
        return [];
    }
};

//Admin controller
