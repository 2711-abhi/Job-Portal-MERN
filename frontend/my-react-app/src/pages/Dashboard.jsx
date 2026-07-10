import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (user.role === "student") {
        const res = await axios.get(
          `https://jobportal-backend-gkor.onrender.com/api/applications/my-applications/${user._id}`
        );

        const applications = res.data;

        setStats({
          total: applications.length,
          pending: applications.filter(a => a.status === "Pending").length,
          accepted: applications.filter(a => a.status === "Accepted").length,
          rejected: applications.filter(a => a.status === "Rejected").length,
        });

      } else {

        const res = await axios.get(
          `https://jobportal-backend-gkor.onrender.com/api/jobs/my-jobs/${user._id}`
        );

        const jobs = res.data;

        setStats({
          total: jobs.length,
          pending: 0,
          accepted: 0,
          rejected: 0,
        });

      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">

      <h1>Welcome, {user.name} 👋</h1>

      <div className="dashboard-grid">

        <div className="card">
          <h2>{stats.total}</h2>
          <p>{user.role==="student" ? "Applications" : "Jobs Posted"}</p>
        </div>

        <div className="card">
          <h2>{stats.pending}</h2>
          <p>Pending</p>
        </div>

        <div className="card">
          <h2>{stats.accepted}</h2>
          <p>Accepted</p>
        </div>

        <div className="card">
          <h2>{stats.rejected}</h2>
          <p>Rejected</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;