import "./App.css";
// import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar";
import { ParentDashboard } from "./components/parent";
import { AdminDashboard } from "./components/admin";
import { TeacherDashboard } from "./components/teacher";

import Footer from "./components/Footer";
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from "./components/Welcome";

import { ResultsProvider } from './context/ResultsContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useAuth } from './context/useAuth';


function App() {
  const { isSignedIn, user } = useUser();
  const { login, logout } = useAuth();

  useEffect(() => {
    if (isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress || '';
      const name = user.fullName || user.username || email;
      login(email, name);
    } else {
      logout();
    }
    // Only run when Clerk user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user]);

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