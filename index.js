const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./api/user");
const categoryRoutes = require("./api/category");
const foodItemRoutes = require("./api/foodItem");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION_STRING);
const db = mongoose.connection;
db.once("open", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to MongoDB");
  }
});

db.on("error", (error) => {
  if (error) {
    console.log(error);
  }
});

app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/food-item", foodItemRoutes);

app.listen(4444, () => {
  console.log("server started on port", 4444);
});
