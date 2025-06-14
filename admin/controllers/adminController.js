const AdminUser = require("../models/AdminUser");
const { generateToken } = require("../../config/auth");
const isAdmin = require("../middlewares/isAdmin");

exports.getLogin = (req, res) => {
  if (req.session.admin) {
    return req.session.admin.isSuperAdmin 
      ? res.redirect("/admin/dashboard") 
      : res.redirect("/admin/adminDashboard");
  }

  // Error message handling
  const errorMessages = {
    invalid_credentials: "Invalid username or password",
    account_inactive: "Your account is not active or locked",
    access_denied: "You don't have admin privileges",
    server_error: "Server error occurred"
  };

  const error = req.query.error ? errorMessages[req.query.error] : null;

  res.render("login", {
    layout: "admin-layout",
    error: error
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ email });
     // 1. Check credentials
     if (!admin || !(await admin.comparePassword(password))) {
      return res.redirect("/admin/login?error=invalid_credentials");
    }
     // 2. Check account status
     if (admin.profileStatus !== 'Active') {
      return res.redirect("/admin/login?error=account_inactive");
    }

    // 3. Verify admin privileges
    if (!admin.isSuperAdmin && !admin.isAdmin) {
      return res.redirect("/admin/login?error=access_denied");
    }

    req.session.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      isSuperAdmin: admin.isSuperAdmin,
      isAdmin: admin.isAdmin,
      profileStatus: admin.profileStatus,
      department: admin.department,
      position: admin.position,
      designation: admin.designation,
      order: admin.order,
    };

    // Token generation and cookie setting (keeping your existing token logic)
    const token = generateToken(admin);
    res.cookie("adminToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Redirect based on admin type
    if (admin.isSuperAdmin) {
      res.redirect("dashboard");
    } else {
      res.redirect("adminDashboard");
    }
  } catch (err) {
    console.error("Login error:", err);
    console.error("Login error:", err);
    res.redirect("/admin/login?error=server_error");
  }
};

exports.getDashboard = [isAdmin, (req, res) => {
  if (!req.session.admin.isSuperAdmin) {
    return res.redirect("/admin/adminDashboard");
  }
  res.render("dashboard", {
    layout: "dashboard-layout",
    admin: req.session.admin
  });
}];

exports.getAdminDashboard = [isAdmin, (req, res) => {
  if (req.session.admin.isSuperAdmin) {
    return res.redirect("/admin/dashboard");
  }
  res.render("adminDashboard", {
    layout: "admin-layout",
    admin: req.session.admin
  });
}];

exports.logout = [isAdmin, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/admin/login");
  });
}];