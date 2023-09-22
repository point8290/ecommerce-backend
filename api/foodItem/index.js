const express = require("express");
const footItem = require("../../models/footItem.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await footItem.find({});
    res.json({
      status: "ok",
      products,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      status: "error",
      error: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await footItem.find({ category: id });
    res.json({ status: "ok", products: products });
  } catch (error) {
    res.json({
      status: "error",
      error: err,
    });
  }

  router.get("/product/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const product = await footItem.findById(id);
      res.json({ status: "ok", product: product });
    } catch (error) {
      res.json({
        status: "error",
        error: err,
      });
    }
  });
});

module.exports = router;
