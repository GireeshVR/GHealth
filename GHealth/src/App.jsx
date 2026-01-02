import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
// import SetGoal from "./pages/SetGoal";
import About from "./components/About";
import ProtectedRoute from "./components/ProtectedRoute";
import About_outer from "./components/About_outer";
import Trainer from "./components/Trainer";
import Community from "./components/Community";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Navigate to="/about_outer" />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/about_outer" element={<About_outer />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/trainer" element={<Trainer />} />
            <Route path="/community" element={<Community/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
