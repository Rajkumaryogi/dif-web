/**
 * Import required modules and dependencies
 * - express: Framework for building the server
 * - connectDB: Custom module to connect to MongoDB
 * - path: Node.js module for handling file/directory paths
 * - express-ejs-layouts: Middleware for EJS layout support
 * - dotenv: Loads environment variables from a .env file
 * - pageRoutes: Custom routes for handling page requests
 */
const express = require("express");
const connectDB = require("./config/database");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const pageRoutes = require("./routes/pageRoutes");

// Initialize Express application
const app = express();

// --------------------------
// Database Configuration
// --------------------------
// Connect to MongoDB using the imported connectDB function
connectDB();

// --------------------------
// View Engine Setup (EJS)
// --------------------------
// Set the directory where EJS templates are stored
app.set("views", path.join(__dirname, "views"));
// Set EJS as the view engine
app.set("view engine", "ejs");
// Specify the default layout file (e.g., views/layout.ejs)
app.set("layout", "layout");

// --------------------------
// Middleware
// --------------------------
// Serve static files (CSS, JS, images) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware to log request method, URL, and response time
app.use((req, res, next) => {
    const start = Date.now(); // Record start time
    res.on("finish", () => { // Triggered when response is sent
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} took ${duration}ms`);
    });
    next(); // Proceed to the next middleware/route
});

// Handle favicon requests (avoid duplicate logs)
app.get("/favicon.ico", (req, res) => res.status(204));

// Enable EJS layouts (e.g., for shared headers/footers)
app.use(expressLayouts);

// --------------------------
// Routes
// --------------------------
// Mount pageRoutes at the root path ("/")
app.use("/", pageRoutes);

// --------------------------
// Server Startup
// --------------------------
// Set the port from environment variables (default: 3001)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
