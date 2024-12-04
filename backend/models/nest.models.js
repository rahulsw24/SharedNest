const mongoose = require("mongoose");

const nestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    totalExpenses: {
      type: Number,
      default: 0, // Default value when no expenses exist
    },
    inviteCode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nest", nestSchema);
