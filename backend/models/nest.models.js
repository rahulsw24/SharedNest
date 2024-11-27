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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nest", nestSchema);
