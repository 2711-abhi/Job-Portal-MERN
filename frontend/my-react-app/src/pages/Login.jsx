import { useState } from "react";
import axios from "axios";
import "./Form.css";

function Login() {
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
      "http://localhost:5000/api/auth/login",
      user
    );

    // Save JWT Token
    localStorage.setItem("token", res.data.token);

    // Save User Details
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert(res.data.message);

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
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