const express = require("express");
const connectDB = require("./config/database");
const MongoStore = require('connect-mongo');
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
require("dotenv").config();

// Import routes
const pageRoutes = require("./routes/pageRoutes");
const adminRoutes = require("./admin/routes/adminRoutes");

// Initialize app
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));


// Session middleware (for login system)
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// EJS setup
app.set("view engine", "ejs");
// Set views to default frontend views
app.set("views", [path.join(__dirname, "views"), path.join(__dirname, "./admin/views"),]);
app.set("layout", "layout");
app.use(expressLayouts);

// Custom request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} took ${duration}ms`);
  });
  next();
});

// Routes
app.use("/admin", adminRoutes);
app.use("/", pageRoutes);

// Favicon
app.get("/favicon.ico", (req, res) => res.status(204));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
