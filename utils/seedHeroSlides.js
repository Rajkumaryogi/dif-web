require('dotenv').config();
const mongoose = require('mongoose');
const HeroSlide = require('../models/HeroSlide');
const connectDB = require('../config/database');

const seedSlides = [
  {
    image: '/assets/img/heroSlider1.webp',
    title: 'Be the Change!',
    subtitle: 'Let us permit nature to have her way.',
    ctaText: 'Join Us',
    ctaLink: '/join',
    isActive: true,
    order: 2
  },
  {
    image: '/assets/img/heroSlider2.webp',
    title: 'Save Our Rivers',
    subtitle: 'Protecting waterways for future generations',
    ctaText: 'Donate Now',
    ctaLink: '/donate',
    isActive: true,
    order: 1
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    await HeroSlide.deleteMany();
    await HeroSlide.insertMany(seedSlides);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();