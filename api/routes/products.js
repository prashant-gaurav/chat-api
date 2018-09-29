/**
 * Author : Prashant Gaurav
 * Version : 1.0
 *
 */

const express = require("express");
const router = express.Router();
const Products = require("../models/productsModel");
const mongoose = require("mongoose");
const multer = require("multer");

// file upload validation
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload/product/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});
/*===================================================
 *                Get all  User
 *==================================================*/
router.get("/", (req, res, next) => {
  Products.find()
    .select("_id name price image")
    .exec()
    .then(docs => {
      // console.log(docs);
      const response = {
        count: docs.length,
        data: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            image: doc.image,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(rer => {
      console.log(err);
    });
});

/*===================================================
 *                Add new Products
 *==================================================*/
router.post("/", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  const product = new Products({
    // _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    image: req.file.path
  });
  product
    .save()
    .then(result => {
      console.log(result);

      res.status(201).json({
        message: "new product added.",
        data: product
      });
    })
    .catch(err => console.log(err));

  // res.status(201).json({
  //   message: "new users create.",
  //   data: product
  // });
});

/*===================================================
 *              Get Single  Products
 *==================================================*/
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Products.findById(id)
    .select("_id name price image")
    .exec()
    .then(doc => {
      // console.log(doc);
      if (doc) {
        req.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/"
          }
        });
      }
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

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propsName] = ops.value;
  }
  Products.update({ _id: id }, { $set: updateOps })
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
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Products.remove({ _id: id })
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
