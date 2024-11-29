const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenses.models");
const Nest = require("../models/nest.models");

const addExpense = async (req, res) => {
  const { nestId, amount, category, description } = req.body;

  // Validation
  if (!nestId || !amount || !category) {
    return res
      .status(400)
      .json({ message: "Nest ID, amount, and category are required." });
  }

  try {
    // Check if the nest exists
    const nest = await Nest.findById(nestId);
    if (!nest) {
      return res.status(404).json({ message: "Nest not found." });
    }

    // Check if the user is a head or member of the nest
    const userId = req.user._id; // Assuming `req.user` is populated via auth middleware
    const isAuthorized =
      nest.head.toString() === userId.toString() ||
      nest.members.includes(userId);

    if (!isAuthorized) {
      return res.status(403).json({
        message: "You are not authorized to add expenses to this nest.",
      });
    }

    // Create the expense
    const expense = new Expense({
      nestId,
      userId,
      amount,
      category,
      description,
    });

    // Save the expense to the database

    await expense.save();
    nest.totalExpenses += amount;
    console.log(nest.totalExpenses);
    await nest.save();

    const te = nest.totalExpenses;

    res.status(201).json({ message: "Expense added successfully.", expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
//@desc - get expense by particular id
// GET
// /api/expense/:nestId
const getExpense = async (req, res) => {
  const { nestId } = req.params;

  try {
    // Validate if the nest exists
    const nest = await Nest.findById(nestId);
    if (!nest) {
      return res.status(404).json({ message: "Nest not found." });
    }

    // Check if the user is a member or head of the nest
    const userId = req.user._id;
    const isAuthorized =
      nest.head.toString() === userId.toString() ||
      nest.members.includes(userId);

    if (!isAuthorized) {
      return res.status(403).json({
        message: "You are not authorized to view expenses for this nest.",
      });
    }

    // Fetch expenses for the nest
    const expenses = await Expense.find({ nestId }).populate(
      "userId",
      "name email"
    );

    res.status(200).json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc - delete an expense
// DELETE /api/expenses/:nestId/:expenseId
const deleteExpense = async (req, res) => {
  const { nestId, expenseId } = req.params;

  try {
    // Find the expense to delete
    const expense = await Expense.findById(expenseId);
    if (!expense || expense.nestId.toString() !== nestId) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Delete the expense
    await expense.deleteOne({ _id: expenseId });

    // Update total expenses for the nest
    const nest = await Nest.findById(nestId);
    nest.totalExpenses -= expense.amount;
    await nest.save();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addExpense,
  getExpense,
  deleteExpense,
};
