import "./App.css";
// import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar";
import ParentDashboard from "./components/ParentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import Footer from "./components/Footer";
import { useUser } from "@clerk/clerk-react";

function App() {
  const { user } = useUser();
  const teacherEmail = "sandranyambura72@gmail.com";
  const isTeacher = user?.primaryEmailAddress?.emailAddress === teacherEmail;
  return (
    <>
      <CustomNavbar />
      <div className="flex-grow-1">
        <main>
          {isTeacher ? <TeacherDashboard /> : <ParentDashboard />}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;