const express = require("express");
const Cart = require("../../models/cart.model");

const router = express.Router();

router.post("/", async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const newCart = await cart.save();
    res.status(200).json(newCart);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    console.log("error", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart deleted ..." });
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
