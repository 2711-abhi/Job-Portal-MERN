const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Apply Job
router.post("/apply", applyJob);

// Get My Applications
router.get("/my-applications/:userId", getMyApplications);

// Get Applicants
router.get("/applicants/:jobId", getApplicants);

// Update Application Status
router.put("/:id", updateApplicationStatus);

module.exports = router;