import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");

      const selectedJob = res.data.find((item) => item._id === id);

      if (selectedJob) {
        setJob(selectedJob);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/jobs/${id}`,
        job
      );

      alert(res.data.message);

      navigate("/my-jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating job");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Job</h2>

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
          rows="5"
          placeholder="Description"
          value={job.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;