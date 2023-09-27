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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing user accounts
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", validateRegister, validate, register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", validateLogin, validate, login);
/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh access tokens
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Access tokens refreshed successfully
 */
router.post("/refresh", refreshTokens);
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get("/profile", auth, getUserProfile);
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get("/logout", auth, logout);

module.exports = router;
