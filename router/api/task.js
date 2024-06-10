const express = require("express");
const route = express.Router();
const secureAPI = require("../../middleware/secureAPI");
const taskNewController = require("../../controllers/taskNewController");
const verifyToken = require("../../middleware/tokenVerify");
const taskUpdateController = require("../../controllers/taskUpdateController");
const taskDeleteController = require("../../controllers/taskDeleteController");
const taskViewController = require("../../controllers/taskViewController");

route.post("/newtask", secureAPI, verifyToken, taskNewController);
route.get("/tasklist", secureAPI, verifyToken, taskViewController);
route.put("/taskupdate", secureAPI, verifyToken, taskUpdateController);
route.delete("/taskdelete/:taskBy", secureAPI, verifyToken, taskDeleteController);

module.exports = route;
