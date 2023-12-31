const express = require("express");
const router = express.Router();
const {
  createTransaction,
  deleteTransaction,
  filterTransactions,
  updateTransaction,
  getCategoryTotals,
  getFilteredCategoryTotals,
  getAllTransactions,
} = require("../controllers/transactionController");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Endpoints for managing user transactions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionCreate:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           description: The transaction amount.
 *           example: 100.50
 *         category:
 *           type: string
 *           description: The transaction category.
 *           example: Groceries
 *         date:
 *           type: string
 *           format: date
 *           description: The transaction date (YYYY-MM-DD).
 *           example: 2023-09-15
 *         isIncome:
 *           type: boolean
 *           description: Whether the transaction is income or expense.
 *           example: false
 *         comment:
 *           type: string
 *           description: A comment or note for the transaction.
 *           example: Weekly groceries shopping
 *       required:
 *         - amount
 *         - category
 *         - date
 *         - isIncome
 */

/**
 * @swagger
 * /transactions/categories/{month}/{year}:
 *   get:
 *     summary: Get filtered category totals for a specific month and year
 *     tags: [Transactions]
 *     parameters:
 *       - name: month
 *         in: path
 *         description: Month (e.g., 01 for January)
 *         required: true
 *         type: string
 *       - name: year
 *         in: path
 *         description: Year (e.g., 2023)
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Filtered category totals retrieved successfully
 */
router.get("/categories/:month/:year", auth, getFilteredCategoryTotals);

/**
 * @swagger
 * /transactions/categories/totals:
 *   get:
 *     summary: Get category totals
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Category totals retrieved successfully
 */
router.get("/categories/totals", auth, getCategoryTotals);

/**
 * @swagger
 * /transactions/{month}/{year}:
 *   get:
 *     summary: Get filtered transactions for a specific month and year
 *     tags: [Transactions]
 *     parameters:
 *       - name: month
 *         in: path
 *         description: Month (e.g., 01 for January)
 *         required: true
 *         type: string
 *       - name: year
 *         in: path
 *         description: Year (e.g., 2023)
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Filtered transactions retrieved successfully
 */
router.get("/:month/:year", auth, filterTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Transaction ID
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionCreate'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 */
router.patch("/:id", auth, updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Transaction ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 */
router.delete("/:id", auth, deleteTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: All transactions retrieved successfully
 *
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionCreate'
 *     responses:
 *       200:
 *         description: Transaction created successfully
 */
router.get("/", auth, getAllTransactions);

/**
 * @swagger
 * definitions:
 *   TransactionCreate:
 *     type: object
 *     properties:
 *       amount:
 *         type: number
 *         description: The transaction amount.
 *         example: 100.50
 *       category:
 *         type: string
 *         description: The transaction category.
 *         example: Groceries
 *       date:
 *         type: string
 *         format: date
 *         description: The transaction date (YYYY-MM-DD).
 *         example: 2023-09-15
 *       isIncome:
 *         type: boolean
 *         description: Whether the transaction is income or expense.
 *         example: false
 *       comment:
 *         type: string
 *         description: A comment or note for the transaction.
 *         example: Weekly groceries shopping
 *     required:
 *       - amount
 *       - category
 *       - date
 *       - isIncome
 */
router.post("/", auth, createTransaction);

module.exports = router;
