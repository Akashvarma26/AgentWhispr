import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import "./style/Styles.css";
import "./style/Profile.css";
import DarkModeToggle from "../components/DarkMode";

export function Profile() {
  const [user, setUser] = useState(null);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Not logged in → redirect
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <>
      <title>Agent Whispr - Profile</title>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/Whispr">Agent Whispr</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
            <li>
              <a href="/Profile" aria-current="page">
                Profile
              </a>
            </li>
          </ul>
          <DarkModeToggle />
        </nav>
      </header>

      <h1 style={{ color: "var(--textclr)" }}>Welcome to Your Profile</h1>

      {user && (
        <div className="profile-card contact-card" id="profileCard">
          <img
            id="userPic"
            src={user.providerData[0].photoURL || './defpfp.png'}
            alt="Profile"
          />
          <div className="profile-info">
            <h2 style={{ color: "var(--textclr)" }} id="userName">
              {user.displayName || "User"}
            </h2>
            <p style={{ color: "var(--textclr)" }} id="userEmail">
              {user.email}
            </p>
            <button
              style={{
                padding: "10px 20px",
                background: "var(--navbar-bgcolor)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}