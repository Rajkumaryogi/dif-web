const mongoose = require("mongoose");
const MissionVision = require("../models/MissionVision");
require("dotenv").config();
const connectDB = require("../config/database");

// Connect to MongoDB
connectDB();

const seedMissionVision = async () => {
  try {
    console.log("🌱 Seeding MissionVision Data...");

    // Clear existing navbar data
    await MissionVision.deleteMany();

    // Define navbar data
    const missionVisionItems = [
      {
          order: 1,
          heading: "About Us",
          subheading: "Dharti International: Advancing Ecological Restoration and Sustainable Development through Community and Innovation",
          description: "Committed to enhancing ecological balance, Green Horizon promotes afforestation, water conservation, and pond restoration. We engage communities in sustainable practices such as solid waste management and horticulture, while fostering environmental awareness through education. With a strong focus on research and innovation, we aim to create lasting positive impacts on both ecosystems and communities."
      },
      {
          order: 2,
          heading: "Our Mission",
          subheading: "Mission 1",
          description: "Our mission is to restore ecological balance and enhance environmental sustainability through afforestation, water conservation, and pond rejuvenation. We aim to empower communities by fostering active participation in waste management, horticulture, and educational initiatives. By driving innovation and research, we are committed to improving water quality and promoting long-term solutions for ecological health and community development."
      },
      {
          order: 3,
          heading: "Our Vision",
          subheading: "Vision 1",
          description: "Our vision is to create a world where ecosystems thrive in harmony with human development. We envision resilient communities actively engaged in preserving natural resources, where sustainable practices in afforestation, water conservation, and environmental restoration lead to healthier, more sustainable environments for future generations. Through education and innovation, we aspire to be leaders in driving positive environmental and societal change."
      },
      {
          order: 4,
          heading: "From the desk",
          subheading: "Kavi Nishant Bhardwaj Rajput Founder, Dharti International Foundation. ",
          description: "Welcome to Dharti International Foundation (DIF), where our guiding principle is to address the urgent environmental crises of today and secure a sustainable future for tomorrow. As the founder, I am both proud of our achievements and deeply aware of the challenges ahead as we confront the mounting threats to our planet. At DIF, we recognize that the environmental problems we face—rising temperatures, deforestation, water scarcity, and biodiversity loss—require bold, coordinated action. Our focus is on implementing real-world solutions that address the root causes of environmental degradation. Whether it's through our large-scale afforestation efforts like the MISSION 500 CRORE PLANTATION DRIVE, water body rejuvenation under the Save River Campaign, or the promotion of sustainable agricultural practices, every initiative is designed to make a lasting impact. The scale of the environmental challenges before us is immense, but we are undeterred. Our work is built on collaboration—partnering with academic institutions, governments, and grassroots organizations. The path forward demands not just awareness, but bold, immediate action. Join Us: Whether you are an individual, business, or institution, you have a vital role to play. I invite you to be part of our journey toward a greener and healthier world. Together, we can turn the tide on environmental destruction and create a future where human well-being is aligned with the health of our planet. Thank you for being a part of this movement."
      },
      
    ];

    // Insert navbar data into MongoDB
    await MissionVision.insertMany(missionVisionItems);

    console.log("✅ Navbar Data Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

// Run the seed function
seedMissionVision();
