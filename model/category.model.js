const mongoose = require("mongoose");

const Category = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
  },
  { collection: "categories" }
);

const model = mongoose.model("Category", Category);
module.exports = model;
