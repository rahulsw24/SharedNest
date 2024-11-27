const User = require("../models/user.models");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body; // Make sure 'role' is included

  // Validate input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // Default role to 'user' if not provided
  const userRole = role || "user"; // Default to 'user' if no role is provided

  // Check if the user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: userRole, // Store the role in the database
  });

  // Check if the user was successfully created
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      role: user.role, // Include role in the response if needed
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
