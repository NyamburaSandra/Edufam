import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar";
import ParentDashboard from "./components/ParentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import Fees from "./components/Fees";
import Feedback from "./components/Feedback";
import Settings from "./components/Settings";
import Help from "./components/Help";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-wrapper">
      <div className="main-content">
        <CustomNavbar />
        <div className="content-wrapper">
          <main style={{ marginTop: 24 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/parent" replace />} />
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Navigate to="/parent" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;