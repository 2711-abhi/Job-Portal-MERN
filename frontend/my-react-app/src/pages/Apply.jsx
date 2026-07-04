import { useState } from "react";
import axios from "axios";
import "./Form.css";

function Apply() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const job = JSON.parse(localStorage.getItem("selectedJob"));

      if (!user) {
        alert("Please login first.");
        return;
      }

      if (!job) {
        alert("No job selected.");
        return;
      }

      const res = await axios.post(
        "https://jobportal-backend-gkor.onrender.com/api/apply",
        {
          userId: user._id,
          jobId: job._id,
        }
      );

      alert(res.data.message);

      setForm({
        name: "",
        email: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>Apply for Job</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={form.email}
        onChange={handleChange}
      />

      <input type="file" />

      <button onClick={handleSubmit}>
        Submit Application
      </button>
    </div>
  );
}

export default Apply;