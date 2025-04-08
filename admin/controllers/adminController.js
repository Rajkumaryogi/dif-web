
const AdminUser = require("../models/AdminUser");

exports.getLogin = (req, res) => {
  res.render("pages/login", {
    layout: "admin-layout", // this should exist in admin/views/admin-layout.ejs
    error: null
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.render("pages/login", {
            layout: "admin-layout", // this should exist in admin/views/admin-layout.ejs
            error: "Invalid Username & password"
      },);
    }

    req.session.admin = {
      id: admin._id,
      email: admin.email,
      isSuperAdmin: admin.isSuperAdmin,
    };

    admin.lastLogin = new Date();
    await admin.save();

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.render("pages/login", { error: "Server error" });
  }
};

exports.getDashboard = (req, res) => {
    res.render("pages/dashboard", {
        layout: "admin-layout",
        admin: req.session.admin
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/admin/login");
  });
};
