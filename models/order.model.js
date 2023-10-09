const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: false },
    status: { type: String, default: "pending" },
  },
  { collection: "order", timestamps: true }
);

const model = mongoose.model("Order", Order);
module.exports = model;
