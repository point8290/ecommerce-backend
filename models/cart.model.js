const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    userId: { type, String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { collection: "cart", timestamps: true }
);

const model = mongoose.model("Cart", Cart);
module.exports = model;
