import { useEffect, useState } from "react";
import axios from "axios";
import "./Jobs.css";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(
        `https://jobportal-backend-gkor.onrender.com/api/saved-jobs/${user._id}`
      );

      setSavedJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeSavedJob = async (id) => {
    try {
      const res = await axios.delete(
        `https://jobportal-backend-gkor.onrender.com/api/saved-jobs/${id}`
      );

      alert(res.data.message);

      fetchSavedJobs();
    } catch (error) {
      alert("Error removing saved job");
    }
  };

  return (
    <div className="jobs-container">
      <h1>⭐ Saved Jobs</h1>

      <div className="jobs-list">
        {savedJobs.length > 0 ? (
          savedJobs.map((item) => (
            <div className="job-card" key={item._id}>
              <h2>{item.job.title}</h2>

              <p>🏢 {item.job.company}</p>

              <p>📍 {item.job.location}</p>

              <p>💰 {item.job.salary}</p>

              <button
                onClick={() => removeSavedJob(item._id)}
                style={{ backgroundColor: "crimson" }}
              >
                ❌ Remove
              </button>
            </div>
          ))
        ) : (
          <h2>No Saved Jobs</h2>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;