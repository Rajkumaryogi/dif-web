const mongoose = require("mongoose");
const Navbar = require("../models/Navbar");
require("dotenv").config();
const connectDB = require("../config/database");

// Connect to MongoDB
connectDB();

const seedNavbar = async () => {
  try {
    console.log("🌱 Seeding Navbar Data...");

    // Clear existing navbar data
    await Navbar.deleteMany();

    // Define navbar data
    const navbarItems = [
      {
        SNo: 1,
        title: "Home",
        titleLink: "/",
        parentId: 0,
        visibility: true,
        order: 1,
        class: "",
        subItems: [],
      },
      {
        SNo: 2,
        title: "About Us",
        titleLink: "/about",
        parentId: 0,
        visibility: true,
        order: 2,
        class: "",
        subItems: [],
      },
      {
        SNo: 3,
        title: "Our Team",
        titleLink: "/ourTeam",
        parentId: 0,
        visibility: true,
        order: 3,
        class: "",
        subItems: [],
      },
      {
        SNo: 4,
        title: "School Scholars",
        titleLink: "/schoolScholars",
        parentId: 0,
        visibility: true,
        order: 4,
        class: "",
        subItems: [],
      },
      {
        SNo: 5,
        title: "Membership",
        titleLink: "/membership",
        parentId: 0,
        visibility: true,
        order: 5,
        class: "",
        subItems: [],
      },
      {
        SNo: 6,
        title: "More",
        titleLink: "#",
        parentId: 0,
        visibility: true,
        order: 6,
        class: "",
        subItems: [
          {
            title: "Event Timeline",
            titleLink: "/eventTimeline",
            Id: 6, // ParentId is 6 (More)
            order: 1,
            class: "",
          },
          {
            title: "DIF ThinkTank",
            titleLink: "/difThinkTank",
            Id: 6,
            order: 2,
            class: "",
          },
          {
            title: "Projects",
            titleLink: "/projects",
            Id: 6,
            order: 3,
            class: "",
          },
          {
            title: "Internship",
            titleLink: "/internship",
            Id: 6,
            order: 4,
            class: "",
          },
          {
            title: "Contact Us",
            titleLink: "/contactUs",
            Id: 6,
            order: 5,
            class: "",
          },
        ],
      },
      {
        SNo: 7,
        title: "Donate Now",
        titleLink: "/donate",
        parentId: 0,
        visibility: true,
        order: 7,
        class: "donate-btn",
        subItems: [],
      },
    ];

    // Insert navbar data into MongoDB
    await Navbar.insertMany(navbarItems);

    console.log("✅ Navbar Data Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

// Run the seed function
seedNavbar();
