const mongoose = require("mongoose");

const productModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model("Products", productModel);
