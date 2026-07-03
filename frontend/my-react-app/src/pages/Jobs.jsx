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
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>

      <input
        type="text"
        placeholder="Search Jobs..."
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