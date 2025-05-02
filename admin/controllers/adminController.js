
const AdminUser = require("../models/AdminUser");
const { generateToken } = require("../../config/auth");
const isAdmin = require("../middlewares/isAdmin");

exports.getLogin = (req, res) => {
  res.render("login", {
    layout: "admin-layout", // this should exist in admin/views/admin-layout.ejs
    error: null
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.render("login", {
            layout: "admin-layout", // this should exist in admin/views/admin-layout.ejs
            error: "Invalid Username & password"
      },);
    }

    req.session.admin = {
      id: admin._id,
      email: admin.email,
      isSuperAdmin: admin.isSuperAdmin,
    };

    const token = generateToken(admin);

    admin.lastLogin = new Date();
    await admin.save();

    // Option 1: Send the token in the response body (common for APIs)
    // return res.json({ token });

    // Option 2: Send the token as an HTTP-only cookie (more secure for web apps)
    res.cookie("adminToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day (same as token expiration)
      secure: req.secure || req.headers["x-forwarded-proto"] === "https", // Ensure secure in production
    });
    // Redirect to dashboard
    res.redirect("dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.render("login", { 
      layout: "admin-layout",
      error: "Server error" 
    });
  }
};

exports.getDashboard = [isAdmin, (req, res) => {
    res.render("dashboard", {
        layout: "dashboard-layout",
        admin: req.session.admin
  });
}];

exports.logout = [isAdmin, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/admin/login");
  });
}];
