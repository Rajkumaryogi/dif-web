const mongoose = require('mongoose');
const Footer = require('../models/Footer');
const connectDB = require('../config/database');
require('dotenv').config();

// Connect to database
connectDB();

const footerData = {
  foundationName: "Dharti International Foundation",
  logoUrl: "dif_logo.webp", //path to actual logo
  address: "A-140 F/F, Chander Vihar, Laxmi Nagar, Delhi INDIA -110092",
  phone: "+91-99559 00867",
  email: "info@dhartiinternational.org",
  copyrightText: "© 2025 Dharti International Foundation. All Rights Reserved."
};

const seedFooter = async () => {
  try {
    console.log('🌱 Seeding footer data...');
    
    // Clear existing footer data
    await Footer.deleteMany();
    console.log('🗑️ Cleared existing footer data');
    
    // Insert new footer data
    const footer = await Footer.create(footerData);
    console.log('✅ Footer seeded successfully!');
    console.log('Seeded data:', {
      foundationName: footer.foundationName,
      logoUrl: footer.logoUrl,
      address: footer.address,
      phone: footer.phone,
      email: footer.email,
      copyrightText: footer.copyrightText
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding footer:', error);
    process.exit(1);
  }
};

// Run the seeder
seedFooter();