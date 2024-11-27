const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenses.models");
const Nest = require("../models/nest.models");

const addExpense = asyncHandler(async (req, res) => {
  const { nestId, amount, description } = req.body;
  //Check if all fields are there
  if (!nestId || !amount || !description) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  //check if nest exists
  const nest = await Nest.findById(nestId);
  if (!nest) {
    res.status(404);
    throw new Error("Nest Not Found");
  }
  const expense = await Expense.create({
    nestId,
    userId: req.user.id, // This assumes a logged-in user
    amount,
    description,
  });
  nest.totalExpenses = (nest.totalExpenses || 0) + amount;
  await nest.save;
  res.status(201).json(expense);
});

//@desc - get expense by particular id
// GET
// /api/expense/:nestId

const getExpense = asyncHandler(async (req, res) => {
  const { nestId } = req.params;

  const nest = Nest.findById(nestId);
  if (!nest) {
    res.status(404);
    throw new Error("Nest Not Found");
  }

  const expenses = await Expense.find({ nestID }).populate(
    "userId",
    "name email"
  );
  res.status(200).json(expenses);
});

module.exports = {
  addExpense,
  getExpense,
};
