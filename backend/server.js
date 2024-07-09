require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const todoRoute = require("./routes/todo.route");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/todolist";
// MongoDB connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/todos/", todoRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
