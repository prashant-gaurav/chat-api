/**
 * Author : Prashant Gaurav
 * Version : 1.0
 *
 */

const express = require("express");
const router = express.Router();

/*===================================================
 *                Get all  Todo
 *==================================================*/
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "get all todo"
  });
});

/*===================================================
 *                Add new Todo
 *==================================================*/
router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "add new todo"
  });
});

/*===================================================
 *              Get Single  Todo
 *==================================================*/
router.get("/:todoId", (req, res, next) => {
  const id = req.params.userId;
  if (id === "1") {
    res.status(200).json({
      id: id,
      message: "new todo"
    });
  } else {
    res.status(200).json({
      message: "todo not found"
    });
  }
});

/*===================================================
 *                Update Todo
 *==================================================*/
router.patch("/:todoId", (req, res, next) => {
  const id = req.params.userId;
  res.status(200).json({
    message: "todo updated..!"
  });
});

/*===================================================
 *                Delete Todo
 *==================================================*/
router.delete("/:todoId", (req, res, next) => {
  const id = req.params.userId;
  res.status(200).json({
    message: "todo deleted..!"
  });
});
module.exports = router;
