const express = require("express");
const route = express.Router();
const auth = require("./auth");
const task = require("./task");

route.use("/auth", auth);
route.use("/task", task);

module.exports = route;
