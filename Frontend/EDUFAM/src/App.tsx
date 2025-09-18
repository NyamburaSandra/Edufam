import "./App.css";
// import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar";
import { ParentDashboard } from "./components/parent";
import { AdminDashboard } from "./components/admin";
import { TeacherDashboard } from "./components/teacher";
import TeacherDashboardOriginal from "./components/TeacherDashboardOriginal";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from "./components/Welcome";
import { ResultsProvider } from './context/ResultsContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { FeedbackProvider } from './context/FeedbackContext';

function App() {
  return (
    <AttendanceProvider>
      <ResultsProvider>
        <FeedbackProvider>
          <div className="flex-grow-1">
            <main>
              <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<><CustomNavbar /><Welcome /><Footer /></>} />
                <Route path="/parent/*" element={<ParentDashboard />} />
                <Route path="/teacher2" element={<><CustomNavbar /><TeacherDashboardOriginal /></>} />
                <Route path="/teacher/*" element={<><CustomNavbar /><TeacherDashboard /></>} />
                <Route path="/admin/*" element={<><CustomNavbar /><AdminDashboard /></>} />
              </Routes>
            </main>
          </div>
        </FeedbackProvider>
      </ResultsProvider>
    </AttendanceProvider>
  );
}

export default App;