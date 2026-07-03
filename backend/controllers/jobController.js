const Job = require("../models/Job");

// Add Job
const addJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      description,
      recruiter,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      recruiter,
    });

    res.status(201).json({
      message: "Job Added Successfully ✅",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Recruiter's Jobs
const getMyJobs = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const jobs = await Job.find({
      recruiter: recruiterId,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    console.log("Update API Called");
    console.log(req.params);
    console.log(req.body);

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job Updated Successfully ✅",
      updatedJob,
    });

  } catch (error) {
    console.log(error); // 👈 Ye bahut important hai

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job Deleted Successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addJob,
  getJobs,
  getMyJobs,
  updateJob,
  deleteJob,
};