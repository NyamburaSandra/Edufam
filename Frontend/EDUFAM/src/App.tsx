import "./App.css";
// import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar"; // Import the Navbar component
import ParentDashboard from "./components/ParentDashboard"; // Import the ParentDashboard component
import Footer from "./components/Footer"; // Import the Footer component

function App() {
  // const { user } = useUser();
  // const teacherEmail = "sandranyambura72@gmail.com";
  return (
    <>
      <CustomNavbar /> {/* Render the Navbar component */}
      <div className="flex-grow-1">
        <main>
          <ParentDashboard /> {/* Render the ParentDashboard component */}
        </main>
      </div>
      <Footer /> {/* Render the Footer component */}
    </>
  );
}

export default App;