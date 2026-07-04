import { useState } from "react";
import axios from "axios";
import "./Form.css";

function AddJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://jobportal-backend-gkor.onrender.com/api/jobs/add",
        {
          ...job,
          recruiter: user._id,
        }
      );

      alert(res.data.message);

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error adding job");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          rows="5"
          required
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;