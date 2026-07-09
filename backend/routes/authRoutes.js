const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Update Profile
router.put("/update-profile", updateProfile);

module.exports = router;