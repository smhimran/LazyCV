const express = require("express");

const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/user/AddUserValidator");

const avatarUpload = require("../middlewares/user/AvatarUpload");

const {
  signupHandler,
  emailVerificationHandler,
  userLoginHandler,
} = require("../controllers/UserController");

const route = express.Router();

route.post(
  "/signup",
  addUserValidators,
  addUserValidationHandler,
  signupHandler
);

route.post("/activate", emailVerificationHandler);

route.post("/login", userLoginHandler);

module.exports = route;
