// Seed localStorage with users_seed_data.json if not already present
import usersSeedData from './data/users_seed_data.json';

function shouldSeedUsers() {
  const raw = localStorage.getItem('edufam_users');
  if (!raw) return true;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return true;
  } catch {
    return true;
  }
  return false;
}
if (shouldSeedUsers()) {
  localStorage.setItem('edufam_users', JSON.stringify(usersSeedData));
}
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
import { NotificationsProvider } from './context/NotificationsContext';
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
    <NotificationsProvider>
      <AttendanceProvider>
        <ResultsProvider>
          <div className="flex-grow-1">
            <main>
              <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<><CustomNavbar /><Welcome /><Footer /></>} />
                <Route path="/parent/*" element={
                  <FeedbackProvider>
                    <ParentDashboard />
                  </FeedbackProvider>
                } />
                <Route path="/teacher/*" element={
                  <FeedbackProvider>
                    <><CustomNavbar /><TeacherDashboard /></>
                  </FeedbackProvider>
                } />
                <Route path="/admin/*" element={<><CustomNavbar /><AdminDashboard /></>} />
              </Routes>
            </main>
          </div>
        </ResultsProvider>
      </AttendanceProvider>
    </NotificationsProvider>
  );
}

export default App;