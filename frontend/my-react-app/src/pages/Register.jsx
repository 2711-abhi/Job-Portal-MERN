import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Form.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://jobportal-backend-gkor.onrender.com/api/auth/register",
        user
      );

      toast.success(res.data.message);

      // Clear Form
      setUser({
        name: "",
        email: "",
        password: "",
        role: "student",
      });

      // Redirect to Login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={user.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={handleChange}
      />

      <select
        name="role"
        value={user.role}
        onChange={handleChange}
      >
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;