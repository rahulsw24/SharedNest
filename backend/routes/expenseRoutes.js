const express = require("express");
const {
  addExpense,
  getExpense,
  deleteExpense,
  getIndividualExpenses,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add expense
router.post("/", protect, addExpense);

// Get expenses by nest ID
router.get("/:nestId", protect, getExpense);
router.get("/individual-expenses/:nestId", getIndividualExpenses);
router.delete("/:nestId/:expenseId", deleteExpense);

module.exports = router;
