import { useNavigate } from "react-router-dom";
import "./Home.css";
import hero from "../assets/hero.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Find Your Dream Job</h1>

          <p>
            Search thousands of jobs from top companies and
            apply with just one click.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/jobs")}>
              Explore Jobs
            </button>

            <button onClick={() => navigate("/register")}>
              Register Now
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={hero} alt="Job Portal" />
        </div>
      </div>
    </div>
  );
}

export default Home;