/**
 * Author : Prashant Gaurav
 * Version : 1.0
 *
 */
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRouts = require("./api/routes/products");
const todoRouts = require("./api/routes/todo");
const userRout = require("./api/routes/users");

// db Connection
mongoose.connect(
  "mongodb+srv://prashant:" +
    process.env.MONGO_ATLAS_PASSWORD +
    "@nodeapplicationcluster-8wpcr.mongodb.net/nodeapp?retryWrites=true",
  { useNewUrlParser: true }
);

app.use(morgan("dev"));
app.use("/upload/product", express.static("./upload/product/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Method", "POST,PUT,DELETE,PATCH");
    return res.status(200).json({
      message: "You are tying to access from browser"
    });
  }
  next();
});

/**=======================================
 *         Routs to Handle request
 *=======================================*/
app.use("/user", userRout);
app.use("/products", productsRouts);
app.use("/todo", todoRouts);

/**=======================================
 *             Error Handling
 *=======================================*/
app.use((req, res, next) => {
  const error = new Error("Url not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
