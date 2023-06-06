const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  contactnum: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilepic: {
    type: String,
    required: false,
  },

});

module.exports = mongoose.model("users", userSchema);
