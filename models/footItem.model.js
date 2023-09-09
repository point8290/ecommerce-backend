const mongoose = require("mongoose");

const FoodItem = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: false },
    price: { type: Number, required: true },
    ratingCount: { type: Number, required: false },
  },
  { collection: "foodItems" }
);

const model = mongoose.model("FoodItem", FoodItem);
module.exports = model;
