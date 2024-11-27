const express = require("express");
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add expense
router.post("/", protect, addExpense);

// Get expenses by nest ID
router.get("/:nestId", protect, getExpense);
router.delete("/:nestId/:expenseId", deleteExpense);

module.exports = router;
