const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  householdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nest",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
