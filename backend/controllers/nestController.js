const asyncHandler = require("express-async-handler");
const Nest = require("../models/nest.models");

//@desc - create nest
//POST
// protected
const generateUniqueCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 8; // You can adjust the length
  let uniqueCode = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueCode += characters[randomIndex];
  }

  return uniqueCode;
};

const createNest = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    res.status(400);
    throw new Error("Nest name is required");
  }

  const newNest = await Nest.create({
    name,
    head: req.user.id, // The authenticated user is the creator
    members: [req.user.id], // Add the creator to the members list
  });
  if (newNest) {
    res.status(201).json({
      id: newNest._id,
      name: newNest.name,
      head: newNest.head,
      members: newNest.members,
    });
  } else {
    res.status(500);
    throw new Error("Failed to create nest");
  }
});

//@desc - get all nests created by a user
// GET
//protected

const getMyNests = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Find nests where the user is either the head or a member
  const nests = await Nest.find({
    $or: [{ head: userId }, { members: userId }],
  });

  if (nests && nests.length > 0) {
    res.status(200).json(nests);
  } else {
    res.status(404);
    throw new Error("No nests found");
  }
});

// @desc - get details of nest by nestId
// GET /api/nests/:nestId
// Protected

const getANest = asyncHandler(async (req, res) => {
  const { nestId } = req.params;

  if (!nestId) {
    res.status(400);
    throw new Error("Nest Id is required");
  }

  const nest = await Nest.findById(nestId);
  if (!nest) {
    res.status(404);
    throw new Error("Nest Not Found");
  }
  res.status(200).json({ nest });
});

//@desc delete a nest
//@ DELETE /api/nests/:nestId
const deleteNest = asyncHandler(async (req, res) => {
  const { nestId } = req.params;

  if (!nestId) {
    res.status(400);
    throw new Error("Nest ID is required");
  }
  const nest = await Nest.findById(nestId);
  if (!nest) {
    res.status(404);
    throw new Error("Nest cannot be found");
  }
  if (nest.head.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You are not authorized to delete this nest");
  }
  await nest.deleteOne();
  res.status(200).json({ message: "Nest deleted successfully" });
});
//@desc - generates unique invite code
// ROUTE POST /api/nests/:nestId/generate-code
//PROTECTED
const generateInviteCode = async (req, res) => {
  const { nestId } = req.params;
  const uniqueCode = generateUniqueCode(); // Use a utility function to generate the code
  console.log(nestId);

  try {
    const nest = await Nest.findByIdAndUpdate(
      nestId,
      { inviteCode: uniqueCode },
      { new: true }
    );
    if (!nest) {
      return res.status(404).send("Nest not found");
    }
    res.json({ inviteCode: uniqueCode });
  } catch (err) {
    res.status(500).send("Error generating invite code");
  }
};

const joinNest = async (req, res) => {
  const { inviteCode } = req.body;
  const userId = req.user.id; // Assuming authentication middleware adds user info

  try {
    const nest = await Nest.findOne({ inviteCode });
    if (!nest) {
      return res.status(404).send("Invalid invite code");
    }

    if (nest.members.includes(userId)) {
      return res.status(400).send("User is already a member");
    }

    nest.members.push(userId);
    await nest.save();
    res.json({ message: "Successfully joined the nest", nest });
  } catch (err) {
    res.status(500).send("Error joining nest");
  }
};

module.exports = {
  createNest,
  getMyNests,
  deleteNest,
  getANest,
  generateInviteCode,
  joinNest,
};
