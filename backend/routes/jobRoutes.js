const express = require("express");
const router = express.Router();

const {
  addJob,
  getJobs,
  getMyJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Add Job
router.post("/add", addJob);

// Get All Jobs
router.get("/", getJobs);

// Get Recruiter's Jobs
router.get("/my-jobs/:recruiterId", getMyJobs);

// Update Job
router.put("/:id", updateJob);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;