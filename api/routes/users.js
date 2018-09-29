/**
 * Author : Prashant Gaurav
 * Version : 1.0
 */
const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var JWT_KEY = "password";

/*===================================================
 *                Add new User
 *==================================================*/
router.post("/signup", (req, res, next) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status("409").json({
          message: "Email id associated with other account."
        });
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (err) {
            console.log(err);
          } else {
            const user = new Users({
              // _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              mobile: req.body.mobile
            });
            user
              .save()
              .then(result => {
                // console.log(result);
                res.status(201).json({
                  message: "new users create.",
                  data: user
                });
              })
              .catch(err => {
                // console.log(err);
                res.status(409).json({
                  message: "Invalid Email id",
                  error: err
                });
              });
          }
        });
      }
    });
});

/*===================================================
 *                 User Login
 *==================================================*/

router.post("/login", (req, res, next) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      bcrypt.compare(req.body.password, user[0].password, function(
        err,
        result
      ) {
        if (result) {
          // const token = jwt.sign(
          //   {
          //     email: user[0].email,
          //     userId: user[0]._id
          //   },
          //   process.env.JWT_KEY,
          //   {
          //     expiresIn: "1h"
          //   }
          // );

          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Auth success",
            token: token
          });
        } else {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
      });
    })
    .catch(err => {
      res.status(409).json({
        message: "Invalid Email id",
        error: err
      });
    });
});

/*===================================================
 *                Get all  User
 *==================================================*/
router.get("/", (req, res, next) => {
  Users.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(rer => {
      console.log(err);
    });
});

/*===================================================
 *              Get Single  User
 *==================================================*/
router.get("/update/:userId", (req, res, next) => {
  const id = req.params.userId;
  Users.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      req.status(500).json({ error: err });
    });
});

/*===================================================
 *                Update User
 *==================================================*/
router.patch("/:userId", (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propsName] = ops.value;
  }
  Users.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log({ error: err });
      res.status(500).json({ error: err });
    });
});

/*===================================================
 *                Delete User
 *==================================================*/
router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  Users.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
