const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { router } = require("../routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(cors()); //fix cors problems
app.use(express.json()); //enable back end to read data

const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB disconnected");
  });

app.use("/api/users", router);

app.use((req, res) => {
  return res.status(500).json({
    status: 500,
    data: { data: null, message: "invalid routessssss" },
  });
});

app.listen(3000, () => {
  console.log("server runs");
});

// module.exports = app;
