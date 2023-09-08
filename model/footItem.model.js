const mongoose = require("mongoose");

const FoodItem = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { collection: "foodItems" }
);

const model = mongoose.model("FoodItem", FoodItem);
module.exports = model;
