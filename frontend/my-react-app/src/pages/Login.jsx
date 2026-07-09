import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Form.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
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
      "https://jobportal-backend-gkor.onrender.com/api/auth/login",
      user
    );

    // Save Token
    localStorage.setItem("token", res.data.token);

    // Save User
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success(res.data.message);

    if (res.data.user.role === "student") {
      navigate("/jobs");
    } else {
      navigate("/add-job");
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="form-container">
      <h2>Login</h2>

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

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;