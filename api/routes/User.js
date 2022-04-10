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
  resetPasswordHandler,
  resetPasswordVerificationHandler,
  getAccessToken,
  getCurrentUser,
} = require("../controllers/UserController");
const verifyRefreshToken = require("../middlewares/auth/verifyRefreshToken");
const isAuthenticated = require("../middlewares/auth/IsAuthenticated");

const route = express.Router();

route.post(
  "/signup",
  addUserValidators,
  addUserValidationHandler,
  signupHandler
);

route.post("/activate", emailVerificationHandler);

route.post("/login", userLoginHandler);

route.post("/reset-password", resetPasswordHandler);

route.post("/reset-password-verification", resetPasswordVerificationHandler);

route.get("/access", verifyRefreshToken, getAccessToken);

route.get("/me", isAuthenticated, getCurrentUser);

module.exports = route;
