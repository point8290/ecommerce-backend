const express = require("express");
const User = require("../../models/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    if (req.body.confirmPassword != req.body.password) {
      res.json({
        status: "error",
        error: "Password do not match",
      });
    }
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: encryptedPassword,
    });

    res.json({ status: "ok" });
  } catch (err) {
    res.json({
      status: "error",
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.json({
        status: "error",
        error: "Invalid Login",
      });
    } else {
      const isPasswordValid = bcrypt.compare(req.body.password, user.password);
      if (isPasswordValid) {
        res.json({ status: "ok" });
      } else {
        res.json({
          status: "error",
          error: "Incorrect Password",
        });
      }
    }
  } catch (err) {
    res.json({
      status: "error",
      error: err,
    });
  }
});

module.exports = router;
