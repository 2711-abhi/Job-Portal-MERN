import { useState } from "react";
import axios from "axios";
import "./Form.css";

function Apply() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [resume, setResume] = useState(null);

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

      if (!resume) {
        alert("Please upload your resume.");
        return;
      }

      const formData = new FormData();

      formData.append("userId", user._id);
      formData.append("jobId", job._id);
      formData.append("resume", resume);

      const res = await axios.post(
        "https://jobportal-backend-gkor.onrender.com/api/applications/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      setForm({
        name: "",
        email: "",
      });

      setResume(null);

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

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <button onClick={handleSubmit}>
        Submit Application
      </button>
    </div>
  );
}

export default Apply;