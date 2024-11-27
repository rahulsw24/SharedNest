const asyncHandler = require("express-async-handler");
const Nest = require("../models/nest.models");

//@desc - create nest
//POST
// protected

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
  const nests = await Nest.find({ head: req.user.id });

  if (nests) {
    res.status(200).json(nests);
  } else {
    res.status(404);
    throw new Error("No nests found");
  }
});

module.exports = {
  createNest,
  getMyNests,
};
