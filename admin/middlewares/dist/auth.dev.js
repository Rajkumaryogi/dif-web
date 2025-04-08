"use strict";

exports.isAuthenticated = function (req, res, next) {
  if (req.session.admin) next(); // Assuming session-based auth
  else res.redirect("/admin/login");
};