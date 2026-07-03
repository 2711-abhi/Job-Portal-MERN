import "./JobDetails.css";
import { Link } from "react-router-dom";

function JobDetails() {
  return (
    <div className="job-details">
      <div className="job-card">
        <h1>React Developer</h1>

        <p><strong>Company:</strong> TCS</p>

        <p><strong>Location:</strong> Bhubaneswar</p>

        <p><strong>Salary:</strong> 6 LPA</p>

        <p>
          Looking for a React Developer with knowledge of
          React, JavaScript and API integration.
        </p>

        <Link to="/apply"><button>Apply Now</button></Link>
      </div>
    </div>
  );
}

export default JobDetails;