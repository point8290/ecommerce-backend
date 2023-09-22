const express = require("express");
const Order = require("../../models/order.model");

const router = express.Router();

router.post("/", async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(200).json(newOrder);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findOneAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    console.log("error", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted ..." });
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
