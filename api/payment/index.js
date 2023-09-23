const express = require("express");
require("dotenv").config();

const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", (req, res) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "inr",
      },
      (error, response) => {
        console.log("error", error);
        if (error) {
          res.status(500).json({ error });
        } else {
          console.log("error", error);

          res.status(200).json({ response });
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
});
module.exports = router;
