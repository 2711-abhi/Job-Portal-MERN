import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isRecruiter = user?.role === "recruiter";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful ✅");

    navigate("/");
  };

  return (
    <nav>
      <h2>Job Portal</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "15px", fontWeight: "bold" }}>
              👋 {user.name}
            </span>

            {/* Dashboard */}
            <Link to="/dashboard">Dashboard</Link>

            {isRecruiter ? (
              <>
                <Link to="/add-job">Add Job</Link>
                <Link to="/my-jobs">My Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/my-applications">My Applications</Link>
              </>
            )}

            <Link to="/profile">Profile</Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;