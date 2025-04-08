"use strict";

exports.renderLogin = function (req, res) {
  res.render("admin/login", {
    layout: "admin/layout"
  }); // Use admin layout
};

exports.renderDashboard = function (req, res) {
  res.render("admin/dashboard", {
    layout: "admin/layout"
  });
};