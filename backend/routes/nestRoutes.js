const express = require("express");
const {
  createNest,
  getMyNests,
  getANest,
} = require("../controllers/nestController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createNest);
router.get("/my-nests", protect, getMyNests).get("/:nestId", protect, getANest);

module.exports = router;
