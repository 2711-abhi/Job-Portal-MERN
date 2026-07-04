import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Jobs.css";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get(
        `https://jobportal-backend-gkor.onrender.com/api/jobs/my-jobs/${user._id}`
      );

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://jobportal-backend-gkor.onrender.com/api/jobs/${id}`
      );

      alert(res.data.message);

      fetchMyJobs();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Error deleting job");
    }
  };

  return (
    <div className="jobs-container">
      <h1>My Jobs</h1>

      <div className="jobs-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h2>{job.title}</h2>

              <p>🏢 {job.company}</p>

              <p>📍 {job.location}</p>

              <p>💰 {job.salary}</p>

              <p>{job.description}</p>

              <Link to={`/edit-job/${job._id}`}><button>Edit</button></Link>

              <Link to={`/applicants/${job._id}`}><button>View Applicants</button></Link>

              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          ))
        ) : (
          <h2>No Jobs Posted Yet</h2>
        )}
      </div>
    </div>
  );
}

export default MyJobs;