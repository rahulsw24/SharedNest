const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  nestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nest",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
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
