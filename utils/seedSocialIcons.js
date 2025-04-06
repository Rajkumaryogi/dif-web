const mongoose = require("mongoose");
require("dotenv").config();
const SocialIcon = require("../models/SocialIcon");
const connectDB = require("../config/database");

connectDB();

const socialIcons = [
    { name: "Facebook", url: "https://facebook.com/yourpage", iconClass: "fab fa-facebook", color:"#166FE5" },
    { name: "YouTube", url: "https://www.youtube.com/channel/yourpage", iconClass: "fa-brands fa-youtube",color:"#CC0000" },
    { name: "Twitter", url: "https://twitter.com/yourpage", iconClass: "fa-brands fa-twitter",color:"#1A91DA" },
    { name: "Instagram", url: "https://instagram.com/yourpage", iconClass: "fa-brands fa-instagram",color:"#833AB4" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", iconClass: "fa-brands fa-linkedin",color:"#004182" }
];

async function seedSocialIcons() {
    try {
        await SocialIcon.deleteMany(); // Clear existing data
        await SocialIcon.insertMany(socialIcons);
        console.log("Social icons seeded successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedSocialIcons();
