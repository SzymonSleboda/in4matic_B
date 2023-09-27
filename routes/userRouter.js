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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: mySecurePassword
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: John Doe
 *             email: john.doe@example.com
 *             password: mySecurePassword
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", validateRegister, validate, register);

/**
 * @swagger
 * /users/login:
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
 *                 description: The email address of the user.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: mySecurePassword
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
 * /users/refresh:
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
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get("/profile", auth, getUserProfile);

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Log out a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get("/logout", auth, logout);

module.exports = router;
