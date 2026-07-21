const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

// Apply for a Job
const applyJob = async (req, res) => {
  try {

    console.log("FILE OBJECT:", JSON.stringify(req.file, null, 2));
    
    const { userId, jobId } = req.body;

    // Check if already applied
    const existingApplication = await Application.findOne({
      user: userId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    // Resume URL from Cloudinary
    const resumeUrl = req.file ? req.file.path : "";

    // Create application
    const application = await Application.create({
      user: userId,
      job: jobId,
      resume: resumeUrl,
    });

    res.status(201).json({
      message: "Application Submitted Successfully ✅",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Applications
const getMyApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({
      user: userId,
    }).populate("job");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Applicants for Recruiter's Job
const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicants = await Application.find({
      job: jobId,
    })
      .populate("user", "name email")
      .populate("job", "title company");

    res.status(200).json(applicants);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application Status Updated Successfully ✅",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
};