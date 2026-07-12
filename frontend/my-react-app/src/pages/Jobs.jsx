import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Jobs.css";

function Jobs() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://jobportal-backend-gkor.onrender.com/api/jobs"
      );
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveJob = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        "https://jobportal-backend-gkor.onrender.com/api/saved-jobs/save",
        {
          userId: user._id,
          jobId,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error saving job");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const value = search.toLowerCase();

    return (
      job.title.toLowerCase().includes(value) ||
      job.company.toLowerCase().includes(value) ||
      job.location.toLowerCase().includes(value)
    );
  });

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>

      <input
        type="text"
        placeholder="Search by Job, Company or Location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h2>{job.title}</h2>

              <p>🏢 {job.company}</p>

              <p>📍 {job.location}</p>

              <p>💰 {job.salary}</p>

              <Link
                to="/job-details"
                onClick={() =>
                  localStorage.setItem(
                    "selectedJob",
                    JSON.stringify(job)
                  )
                }
              >
                <button>View Details</button>
              </Link>

              <Link
                to="/apply"
                onClick={() =>
                  localStorage.setItem(
                    "selectedJob",
                    JSON.stringify(job)
                  )
                }
              >
                <button>Apply Now</button>
              </Link>

              <button onClick={() => saveJob(job._id)}>
                ❤️ Save Job
              </button>
            </div>
          ))
        ) : (
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>
            No Jobs Found
          </h3>
        )}
      </div>
    </div>
  );
}

export default Jobs;