// import { useState } from "react";
import "./App.css";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  

  return (
    <>
      <header>
        {/* Clerk authentication buttons */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <main>
        <h1>Parents screen</h1>
        {/* Example Parent screen */}
        <div>
          
        </div>
      </main>
    </>
  );
}

export default App;
