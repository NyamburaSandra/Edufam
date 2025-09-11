import "./App.css";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar";
import ParentDashboard from "./components/ParentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Spline from '@splinetool/react-spline';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useUser();
  const teacherEmail = "sandranyambura72@gmail.com";
  return (
    <Router>
      <div className="app-container">
        <CustomNavbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    {user?.primaryEmailAddress?.emailAddress === teacherEmail ? (
                      <Navigate to="/teacher" />
                    ) : (
                      <Navigate to="/parent" />
                    )}
                  </SignedIn>
                  <SignedOut>
                    <div className="spline-welcome-container">
                      <Spline scene="https://prod.spline.design/fAvXJNWrv8KPw0GZ/scene.splinecode" style={{ width: '100%', height: '100%' }} className="react-spline" />
                      <div className="welcome-overlay">
                        <Welcome />
                      </div>
                    </div>
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/parent"
              element={
                <>
                  <SignedIn>
                    <ParentDashboard />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/" />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/teacher"
              element={
                <>
                  <SignedIn>
                    <TeacherDashboard />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/" />
                  </SignedOut>
                </>
              }
            />
            <Route path="/welcome" element={
              <div className="spline-welcome-container">
                <Spline scene="https://prod.spline.design/fAvXJNWrv8KPw0GZ/scene.splinecode" style={{ width: '100%', height: '100%' }} className="react-spline" />
                <div className="welcome-overlay">
                  <Welcome />
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;