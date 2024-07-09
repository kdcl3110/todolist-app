const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const todoRoute = require("./routes/todo.route");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/todos/", todoRoute);

module.exports = app;