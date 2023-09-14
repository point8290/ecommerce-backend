const express = require("express");
const footItem = require("../../models/footItem.model");

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await footItem.find({});
    res.json({ status: "ok", products });
  } catch (error) {
    res.json({
      status: "error",
      error: err,
    });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await footItem.find({ id: id });
    res.json({ status: "ok", product: product[0] });
  } catch (error) {
    res.json({
      status: "error",
      error: err,
    });
  }
});

module.exports = router;
