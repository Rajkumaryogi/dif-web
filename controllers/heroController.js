const HeroSlide = require('../models/HeroSlide');

exports.getActiveHeroSlides = async () => {
  try {
    return await HeroSlide.find({ isActive: true })
                         .sort({ order: 1 })
                         .lean();
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
};

// Admin functions
