const mongoose = require("mongoose");
require("dotenv").config();
const SocialIcon = require("../models/SocialIcon");
const connectDB = require("../config/database");

connectDB();

const socialIcons = [
    { order: 1, name: "Facebook", url: "https://facebook.com/yourpage", iconClass: "fab fa-facebook", visibility: true, color:"#166FE5" },
    { order: 2, name: "YouTube", url: "https://www.youtube.com/channel/yourpage", iconClass: "fa-brands fa-youtube", visibility: true, color:"#CC0000" },
    { order: 3, name: "Twitter", url: "https://twitter.com/yourpage", iconClass: "fa-brands fa-twitter", visibility: true, color:"#1A91DA" },
    {order: 4, name: "Instagram", url: "https://instagram.com/yourpage", iconClass: "fa-brands fa-instagram", visibility: true, color:"#833AB4" },
    {order: 5, name: "LinkedIn", url: "https://www.linkedin.com/company/yourpage", iconClass: "fa-brands fa-linkedin", visibility: true, color:"#004182" },
    {order: 6, name: "GitHub", url: "https://github.com/Dharti-International-Foundation/DIF-webDevJS", iconClass: "fa-brands fa-github", visibility: true, color:"#000000" }
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
