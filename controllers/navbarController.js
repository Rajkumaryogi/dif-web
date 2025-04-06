const Navbar = require("../models/Navbar");

let cachedNavbarData = null;
let lastFetchTime = 0;

exports.getNavbarData = async () => {
    const cacheDuration = 5 * 60 * 1000; // 5 minutes
    const now = Date.now();

    if (cachedNavbarData && now - lastFetchTime < cacheDuration) {
        return cachedNavbarData;
    }
    try {
        cachedNavbarData = await Navbar.find({ visibility: true }).sort({ order: 1 }).lean();
        lastFetchTime = now;
        return cachedNavbarData;
    } catch (error) {
        console.error("Error fetching navbar:", error);
        return [];
    }
};

// Return empty array if error occurs