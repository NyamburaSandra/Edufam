import "./App.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import CustomNavbar from "./components/Navbar"; // Import the Navbar component
import ParentDashboard from "./components/ParentDashboard"; // Import the ParentDashboard component
import Footer from "./components/Footer"; // Import the Footer component

function App() {
  return (
    <>
      <CustomNavbar /> {/* Render the Navbar component */}
      <header>
        {/* Clerk authentication buttons */}
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </header>
      

      <main>
        
        <ParentDashboard /> {/* Render the ParentDashboard component */}
      </main>
      <Footer /> {/* Render the Footer component */}
    </>
  );
}

export default App;

// 