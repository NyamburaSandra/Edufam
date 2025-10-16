// Seed localStorage with users_seed_data.json if not already present
import usersSeedData from './data/users_seed_data.json';
// Stronger typing for the imported seed JSON to avoid `any`
type UsersSeedFile = {
  users_seed: Array<Record<string, unknown>>;
  pending_accounts_seed?: Array<Record<string, unknown>>;
};
import seedData from './data/seed_data.json';

// Seed pending accounts only once using a flag
const pendingSeedFlag = 'edufam_pending_accounts_seeded';
if (!localStorage.getItem(pendingSeedFlag)) {
  localStorage.setItem('edufam_pending_accounts', JSON.stringify(usersSeedData.pending_accounts_seed));
  localStorage.setItem(pendingSeedFlag, 'true');
}
// Normalize `edufam_users` storage shape if an older deployment stored the entire seed object
function normalizeUsersStorage() {
  const raw = localStorage.getItem('edufam_users');
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return;
    if (parsed && parsed.users_seed && Array.isArray(parsed.users_seed)) {
      localStorage.setItem('edufam_users', JSON.stringify(parsed.users_seed));
      return;
    }
    // Fallback: reset to empty array to avoid runtime errors
    localStorage.setItem('edufam_users', JSON.stringify([]));
  } catch {
    localStorage.setItem('edufam_users', JSON.stringify([]));
  }
}

// Run normalization early
normalizeUsersStorage();
function shouldSeedFeedbacks() {
  const raw = localStorage.getItem('edufam_feedbacks');
  if (!raw) return true;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return true;
  } catch {
    return true;
  }
  return false;
}
if (shouldSeedFeedbacks()) {
  localStorage.setItem('edufam_feedbacks', JSON.stringify(seedData.feedback));
}

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
  // `usersSeedData` is an object that contains the actual array under `users_seed`.
  const usersArray = ((usersSeedData as unknown) as UsersSeedFile).users_seed || [];
  localStorage.setItem('edufam_users', JSON.stringify(usersArray));
}
import "./App.css";
// import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar";
import { ParentDashboard } from "./components/parent";
import { AdminDashboard } from "./components/admin";
import { TeacherDashboard } from "./components/teacher";
import { SmsModalProvider } from './context/SmsModalContext';

import Footer from "./components/Footer";
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from "./components/Welcome";

import { ResultsProvider } from './context/ResultsContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { NotificationsProvider } from './context/NotificationsContext';

import { AuthProvider } from './context/AuthContext';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useAuth } from './context/useAuth';

function AppContent() {
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
                <Route path="/admin/*" element={<><CustomNavbar /><SmsModalProvider><AdminDashboard /></SmsModalProvider></>} />
              </Routes>
            </main>
          </div>
        </ResultsProvider>
      </AttendanceProvider>
    </NotificationsProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;