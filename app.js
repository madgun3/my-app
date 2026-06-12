const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// DB
require("./config/db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Static
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/web"));
app.use("/auth", require("./routes/auth"));

app.listen(3004, () => {
  console.log("Server running on http://localhost:3004");
});