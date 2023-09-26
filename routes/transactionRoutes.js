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

router.get("/categories/:month/:year", auth, getFilteredCategoryTotals);

router.get("/categories/totals", auth, getCategoryTotals);

router.get("/:month/:year", auth, filterTransactions);

router.patch("/:id", auth, updateTransaction);

router.delete("/:id", auth, deleteTransaction);

router.get("/", auth, getAllTransactions);

router.post("/", auth, createTransaction);

module.exports = router;
