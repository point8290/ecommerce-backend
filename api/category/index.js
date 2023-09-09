const express = require("express");
const Category = require("../../models/category.model");

const router = express.Router();

router.get("/getAllCategories", async (req, res) => {
  try {
    const categories = await Category.find({});

    res.json({ status: "ok", categories });
  } catch (err) {
    res.json({
      status: "error",
      error: err,
    });
  }
});

module.exports = router;
