const AdminUser = require("../models/AdminUser");
const isAdmin = require("../middlewares/isAdmin");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { hashPassword, comparePassword } = require("../secure/hashPassword");
const { generateToken } = require("../../config/auth");

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


exports.getForgetPass = (req, res) => {
  if (req.session.admin) {
    return req.session.admin.isSuperAdmin 
      ? res.redirect("/admin/dashboard") 
      : res.redirect("/admin/adminDashboard");
  }

  // Error message handling
  const errorMessages = {
    invalid_credentials: "Invalid email",
    account_inactive: "Your account is not active or locked",
    access_denied: "You don't have admin privileges",
    server_error: "Server error occurred"
  };

  const error = req.query.error ? errorMessages[req.query.error] : null;

  res.render("forget-pass", {
    layout: "admin-layout",
    error: error
    });
};

exports.postForgetPass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }
    const checkUser = await AdminUser.findOne({ email });

    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "User not found please register" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: "yogiweb1122@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(receiver);

    return res.status(200).send({
      message: "Password reset link send successfully on your gmail account",
    });


  }catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }

};

exports.getResetPassword = async (req, res) => {
    const { token } = req.params;

  // Error message handling
  const errorMessages = {
    invalid_credentials: "Invalid email",
    account_inactive: "Your account is not active or locked",
    access_denied: "You don't have admin privileges",
    server_error: "Server error occurred"
  };

  const error = req.query.error ? errorMessages[req.query.error] : null;

  res.render("reset-pass", {
    layout: "admin-layout",
    error: error,
    token: token  // Pass the token to the view
  });

};
exports.postResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).render('reset-pass', {
        layout: 'admin-layout',
        error: 'Please provide password',
        token: token
      });
    }

    // Verify token and decode email
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AdminUser.findOne({ email: decode.email });

    if (!user) {
      return res.status(400).render('reset-pass', {
        layout: 'admin-layout',
        error: 'User not found',
        token: token
      });
    }

    // Hash new password
    const newHashPassword = await hashPassword(password);
    
    // Update password directly using updateOne to bypass any middleware issues
    const result = await AdminUser.updateOne(
      { _id: user._id },
      { $set: { password: newHashPassword } }
    );

    if (result.modifiedCount === 0) {
      throw new Error('Password update failed');
    }

    // Redirect to login with success message
    return res.redirect('/admin/login?reset=success');
    
  } catch (error) {
    console.error("Reset password error:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(400).render('reset-pass', {
        layout: 'admin-layout',
        error: 'Password reset link has expired',
        token: token
      });
    }
    
    return res.status(500).render('reset-pass', {
      layout: 'admin-layout',
      error: error.message || 'Something went wrong',
      token: token
    });
  }
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