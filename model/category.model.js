const mongoose = require("mongoose");

const Category = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { collection: "categories" }
);

const model = mongoose.model("Category", Category);
module.exports = model;
