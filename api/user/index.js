const express = require("express");
const User = require("../../models/user.model");
const admin = require("../../config/firebase-config");

const auth = admin.auth();
const router = express.Router();

const verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message:
        "Invalid request body. Must contain email and password for user.",
    });
  }
  try {
    const newFirebaseUser = await admin.auth().createUser({
      email,
      password,
    });
    console.log("Api called", newFirebaseUser);

    if (newFirebaseUser) {
      const user = User.create({
        email,
        firebaseId: newFirebaseUser.uid,
      });
    }
    return res
      .status(200)
      .json({ message: "Account created successfully. Please sign in." });
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      return res
        .status(400)
        .json({ messgae: "User account already exists at email address." });
    }
    return res.status(500).json({ error: "Server error. Please try again" });
  }
});

router.post("/google", async (req, res) => {
  const { firebaseUser } = req.body;
  console.log("firebaseUser", firebaseUser);
  try {
    const dbUser = await User.findOne({ firebaseId: firebaseUser.uid });
    if (!dbUser) {
      const user = {};
      if (firebaseUser.email) user.email = firebaseUser.email;
      if (firebaseUser.uid) user.firebaseId = firebaseUser.uid;
      if (firebaseUser.phone) user.phone = firebaseUser.phone;
      if (firebaseUser.name) user.name = firebaseUser.name;
      User.create(user);
    }

    return res.status(200).json({ message: "Signed In." });
  } catch (err) {
    return res.status(500).json({ error: "Server error. Please try again" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { idToken } = req.body;
    verifyIdToken(idToken)
      .then(async (decodedToken) => {
        console.log("token", decodedToken.uid);
        const user = await User.find({ firebaseId: decodedToken.uid });

        if (!user || user.length == 0) {
          res.json({
            status: "error",
            error: "Invalid Login",
          });
        } else {
          res.status(200).json({ user: user[0] });
        }
      })
      .catch((error) => {
        console.error("Error verifying ID token:", error);
      });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again" });
  }
});

module.exports = router;
