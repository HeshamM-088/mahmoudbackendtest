const express = require("express");
const cors = require("cors");
const { user_routes } = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const DB = process.env.DB;
const mongoose = require("mongoose");

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB disconnected");
  });

app.use(cors()); //fix cors problems
app.use(express.json()); //enable back end to read data

app.use("/", (req, res) => {
  return res.status(200).json("done for home page");
});

app.use("/api/users", user_routes);

app.use((req, res) => {
  return res.status(500).json({
    status: 500,
    data: { data: null, message: "invalid routessssss" },
  });
});

module.exports = app;
