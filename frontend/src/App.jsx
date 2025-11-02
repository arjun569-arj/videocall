import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import "./App.css";

function App() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">SignIn</SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      Welcome to the page
    </>
  );
}

export default App;
