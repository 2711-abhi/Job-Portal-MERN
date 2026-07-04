import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Jobs.css";

function Applicants() {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `https://jobportal-backend-gkor.onrender.com/api/applications/applicants/${id}`
      );

      setApplicants(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await axios.put(
        `https://jobportal-backend-gkor.onrender.com/api/applications/${applicationId}`,
        {
          status,
        }
      );

      alert(res.data.message);

      fetchApplicants();
    } catch (error) {
      console.log(error);
      alert("Error updating status");
    }
  };

  return (
    <div className="jobs-container">
      <h1>Applicants</h1>

      {applicants.length > 0 ? (
        applicants.map((app) => (
          <div className="job-card" key={app._id}>
            <h2>{app.user.name}</h2>

            <p>📧 {app.user.email}</p>

            <p>💼 {app.job.title}</p>

            <p>🏢 {app.job.company}</p>

            <p>
              <strong>Status:</strong> {app.status}
            </p>

            <button
              onClick={() => updateStatus(app._id, "Accepted")}
            >
              ✅ Accept
            </button>

            <button
              onClick={() => updateStatus(app._id, "Rejected")}
              style={{
                marginLeft: "10px",
                backgroundColor: "crimson",
              }}
            >
              ❌ Reject
            </button>
          </div>
        ))
      ) : (
        <h2>No Applicants Yet</h2>
      )}
    </div>
  );
}

export default Applicants;