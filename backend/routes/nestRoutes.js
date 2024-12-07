const express = require("express");
const {
  createNest,
  getMyNests,
  getANest,
  generateInviteCode,
  joinNest,
} = require("../controllers/nestController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createNest);
router.get("/my-nests", protect, getMyNests).get("/:nestId", protect, getANest);
router.post("/:nestId/generate-code", generateInviteCode);
router.post("/join", protect, joinNest);

module.exports = router;
