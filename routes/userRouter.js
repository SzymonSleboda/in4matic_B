const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  logout,
  refreshTokens,
} = require("../controllers/userController");
const {
  validateRegister,
  validateLogin,
  validate,
} = require("../utils/validators");
const auth = require("../middleware/authMiddleware");

router.post("/register", validateRegister, validate, register);

router.post("/login", validateLogin, validate, login);

router.post("/refresh", refreshTokens);

router.get("/profile", auth, getUserProfile);

router.get("/logout", auth, logout);

module.exports = router;
