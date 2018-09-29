const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: Number,
    maxLength: 13,
    minLength: 10,
    unique: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Users", userModel);
