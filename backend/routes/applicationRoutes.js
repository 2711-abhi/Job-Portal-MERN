const express = require("express");
const router = express.Router();

const upload = require("../config/multerConfig");

const {
  applyJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Apply Job with Resume Upload
router.post(
  "/apply",
  upload.single("resume"),
  applyJob
);

// Get My Applications
router.get(
  "/my-applications/:userId",
  getMyApplications
);

// Get Applicants
router.get(
  "/applicants/:jobId",
  getApplicants
);

// Update Status
router.put(
  "/:id",
  updateApplicationStatus
);

module.exports = router;