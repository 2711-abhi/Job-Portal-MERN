const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Job Portal Backend API is Running Successfully",
    status: "Success",
  });
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Database Connection Failed\n", err.message));

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});