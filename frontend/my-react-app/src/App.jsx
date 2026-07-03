import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Apply from "./pages/Apply";
import JobDetails from "./pages/JobDetails";
import Footer from "./components/Footer";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AddJob from "./pages/AddJob";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs"element={<ProtectedRoute><Jobs /></ProtectedRoute>}/>
        <Route path="/apply" element={<Apply />} />
        <Route path="/job-details" element={<JobDetails />} />
        <Route path="/my-applications" element={<MyApplications />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-job"element={<ProtectedRoute><AddJob /></ProtectedRoute>}/>
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/edit-job/:id" element={<EditJob />} />  
        <Route path="/applicants/:id" element={<Applicants />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;