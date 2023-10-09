const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String },

    firebaseId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (value) {
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
        },
        message: "Invalid email address",
      },
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },

  { collection: "users" }
);

User.path("email").validate(function (value) {
  return this.email || this.phone;
}, "Either email or phone is required");

const model = mongoose.model("User", User);
module.exports = model;
