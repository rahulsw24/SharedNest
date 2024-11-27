const express = require("express");
const { addExpense, getExpense } = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router;

router.post("/", protect, addExpense);
router.get("/:nestId", protect, getExpense);

module.exports = router;
