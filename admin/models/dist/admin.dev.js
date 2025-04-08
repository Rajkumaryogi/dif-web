"use strict";

var mongoose = require("mongoose");

var AdminSchema = new mongoose.Schema({
  username: String,
  password: String // Hash passwords in production!

});
module.exports = mongoose.model("Admin", AdminSchema);