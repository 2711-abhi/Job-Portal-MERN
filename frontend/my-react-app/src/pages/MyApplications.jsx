import { useEffect, useState } from "react";
import axios from "axios";
import "./Jobs.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);

const user = JSON.parse(localStorage.getItem("user"));
const userId = user._id;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/my-applications/${userId}`
      );

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="jobs-container">
      <h1>My Applications</h1>

      <div className="jobs-list">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div className="job-card" key={application._id}>
              <h2>{application.job.title}</h2>

              <p>🏢 {application.job.company}</p>

              <p>📍 {application.job.location}</p>

              <p>💰 {application.job.salary}</p>

              <p>
                <strong>Status:</strong> {application.status}
              </p>
            </div>
          ))
        ) : (
          <h2>No Applications Found</h2>
        )}
      </div>
    </div>
  );
}

export default MyApplications;