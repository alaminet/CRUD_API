const express = require("express");
const route = express.Router();
const userRegisterController = require("../../controllers/userRegisterController");
const secureAPI = require("../../middleware/secureAPI");
const verifyToken = require("../../middleware/tokenVerify");
const userRegistrationVerifyController = require("../../controllers/userRegistrationVerifyController");
const userLoginController = require("../../controllers/userLoginController");

route.post("/register", secureAPI, userRegisterController);
route.post("/mailverify", secureAPI, userRegistrationVerifyController);
route.post("/login", secureAPI, userLoginController);

module.exports = route;
