const mongoose = require("mongoose");
const ContactCard = require("../models/ContactCard");
require("dotenv").config();
const connectDB = require("../config/database");

// Connect to MongoDB
connectDB();

const seedContactCards = async () => {
  try {
    console.log("🌱 Seeding Contact Cards Data...");

    // Clear existing data
    await ContactCard.deleteMany();

    // Sample team members data
    const teamMembers = [
        {
          name: "Nishant Bhardwaj",
          position: "Founder & CEO",
          designation: "Founder",
          imageUrl: "/assets/img/Nishant.webp",
          email: "nishant@example.com",
          phone: "+91 98765 43210",
          department: "Executive",
          order: 1,
          socialLinks: [
            { name: "Facebook", url: "https://facebook.com/yourpage", color:"#166FE5" },
            { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", color:"#CC0000" },
            { name: "Twitter", url: "https://twitter.com/yourpage", color:"#1A91DA" },
            { name: "Instagram", url: "https://instagram.com/yourpage", color:"#833AB4" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", color:"#004182" }
          ]
        },
        {
          name: "Vikash Kumar",
          position: "Director and Co-Founder",
          designation: "Director",
          imageUrl: "/assets/img/Vikash.webp",
          email: "nishant@example.com",
          phone: "+91 98765 43210",
          department: "Executive",
          order: 2,
          socialLinks: [
            { name: "Facebook", url: "https://facebook.com/yourpage", color:"#166FE5" },
            { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", color:"#CC0000" },
            { name: "Twitter", url: "https://twitter.com/yourpage", color:"#1A91DA" },
            { name: "Instagram", url: "https://instagram.com/yourpage", color:"#833AB4" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", color:"#004182" }]
        },
        {
          name: "Ramesh Kumar",
          position: "Director and Co-Founder",
          designation: "Director",
          imageUrl: "/assets/img/Ramesh.webp",
          email: "nishant@example.com",
          phone: "+91 98765 43210",
          department: "Executive",
          order: 3,
          socialLinks: [
            { name: "Facebook", url: "https://facebook.com/yourpage", color:"#166FE5" },
            { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", color:"#CC0000" },
            { name: "Twitter", url: "https://twitter.com/yourpage", color:"#1A91DA" },
            { name: "Instagram", url: "https://instagram.com/yourpage", color:"#833AB4" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", color:"#004182" }]
        },
        {
          name: "Jayant Kumar",
          position: "Developer Lead",
          designation: "Developer Lead",
          imageUrl: "/assets/img/Jayant.webp",
          email: "nishant@example.com",
          phone: "+91 98765 43210",
          department: "Executive",
          order: 4,
          socialLinks: [
            { name: "Facebook", url: "https://facebook.com/yourpage", color:"#166FE5" },
            { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", color:"#CC0000" },
            { name: "Twitter", url: "https://twitter.com/yourpage", color:"#1A91DA" },
            { name: "Instagram", url: "https://instagram.com/yourpage", color:"#833AB4" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", color:"#004182" }]
        },
        {
          name: "Prinkesh K. Singh",
          position: "Incharge Yoga and Naturopath",
          designation: "Yoga Incharge",
          imageUrl: "/assets/img/Prinkesh.webp",
          email: "nishant@example.com",
          phone: "+91 98765 43210",
          department: "Executive",
          order: 5,
          socialLinks: [
            { name: "Facebook", url: "https://facebook.com/yourpage", color:"#166FE5" },
            { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", color:"#CC0000" },
            { name: "Twitter", url: "https://twitter.com/yourpage", color:"#1A91DA" },
            { name: "Instagram", url: "https://instagram.com/yourpage", color:"#833AB4" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", color:"#004182" }]
        },
        {
          name: "Ansh Raj",
          position: "'School Scholars' Coordinator",
          designation: "School Coordinator",
          imageUrl: "/assets/img/Ansh.webp",
          email: "nishant@example.com",
          phone: "+91 98765 43210",
          department: "Executive",
          order: 6,
          socialLinks: [
            { name: "Facebook", url: "https://facebook.com/yourpage", color:"#166FE5" },
            { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", color:"#CC0000" },
            { name: "Twitter", url: "https://twitter.com/yourpage", color:"#1A91DA" },
            { name: "Instagram", url: "https://instagram.com/yourpage", color:"#833AB4" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", color:"#004182" }]
        },
        {
          name: "Rajkumar Yogi",
          position: "Developer",
          designation: "Developer",
          imageUrl: "/assets/img/Yogi.webp",
          email: "nishant@example.com",
          phone: "+91 98765 43210",
          department: "Executive",
          order: 7,
          socialLinks: [
            { name: "Facebook", url: "https://facebook.com/yourpage", color:"#166FE5" },
            { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", color:"#CC0000" },
            { name: "Twitter", url: "https://twitter.com/yourpage", color:"#1A91DA" },
            { name: "Instagram", url: "https://instagram.com/yourpage", color:"#833AB4" },
            { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", color:"#004182" }]
      }
    ];

    // Insert data into MongoDB
    await ContactCard.insertMany(teamMembers);

    console.log("✅ Contact Cards Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

// Run the seed function
seedContactCards();