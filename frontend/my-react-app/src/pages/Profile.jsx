import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Form.css";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (storedUser) {
      setUser({
        name: storedUser.name,
        email: storedUser.email,
        password: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "https://jobportal-backend-gkor.onrender.com/api/auth/update-profile",
        {
          id: storedUser._id,
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message);

      setUser({
        ...user,
        password: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="form-container">
      <h2>My Profile</h2>

      <form onSubmit={handleUpdate}>
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
          placeholder="New Password (Optional)"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;