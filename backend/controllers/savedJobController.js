const SavedJob = require("../models/SavedJob");

// Save Job
const saveJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    const exists = await SavedJob.findOne({
      user: userId,
      job: jobId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      user: userId,
      job: jobId,
    });

    res.status(201).json({
      message: "Job Saved Successfully ✅",
      savedJob,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
  try {
    const { userId } = req.params;

    const jobs = await SavedJob.find({
      user: userId,
    }).populate("job");

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Saved Job
const removeSavedJob = async (req, res) => {
  try {
    const { id } = req.params;

    await SavedJob.findByIdAndDelete(id);

    res.status(200).json({
      message: "Saved Job Removed ✅",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};