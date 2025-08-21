import { useState } from "react";
import { auth, db } from "../firebaseconfig/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider, 
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import "./style/Styles.css";
import "./style/GoogleButton.css";
import DarkModeToggle from "../components/DarkMode";

export function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  // Email & Password Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatusMsg("❌ Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setStatusMsg("❌ Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullname });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullname: fullname,
        createdAt: new Date().toISOString(),
      });

      alert("✅ New user created! Now login using the same credentials.");
      window.location.href = "/Login";
    } catch (err) {
      setStatusMsg("❌ " + err.message);
    }
  };

  // Google Sign Up
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          fullname: user.displayName || "No Name",
          createdAt: new Date().toISOString(),
        });
      }

      alert("✅ Logged in with Google!");
      window.location.href = "/Profile";
    } catch (err) {
      alert("❌ Google Auth Error: " + err.message);
    }
  };

  return (
    <>
      <title>Agent Whispr - Sign Up</title>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
          </ul>
          <DarkModeToggle />
        </nav>
      </header>

      <main>
        <section className="contact-info-section">
          <div className="login-card">
            <h2 className="card-title">Create Your Free Account</h2>

            <form onSubmit={handleSignUp}>
              <div className="card-text">
                <label htmlFor="name">Full Name</label><br />
                <input
                  type="text"
                  id="name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="card-text" style={{ marginTop: "20px" }}>
                <label htmlFor="email">Email</label><br />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="card-text" style={{ marginTop: "20px" }}>
                <label htmlFor="password">Password</label><br />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="card-text" style={{ marginTop: "20px" }}>
                <label htmlFor="confirm-password">Confirm Password</label><br />
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="card-text" style={{ marginTop: "30px" }}>
                <button
                  id="signupbtn"
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "var(--navbar-bgcolor)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </button>
              </div>

              {statusMsg && (
                <div id="Status-password" style={{ marginTop: "15px", color: "red" }}>
                  {statusMsg}
                </div>
              )}
            </form>

            <div className="card-text" style={{ marginTop: "25px" }}>
              <p>Or continue with:</p>
              <button onClick={handleGoogleAuth} id="googleauth" className="gsi-material-button">
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    {/* Google SVG */}
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48" style={{ display: "block" }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 
                          9.21 3.6l6.85-6.85C35.9 2.38 
                          30.47 0 24 0 14.62 0 6.51 5.38 
                          2.56 13.22l7.98 6.19C12.43 13.72 
                          17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 
                          2.96-2.26 5.48-4.78 7.18l7.73 
                          6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 
                          16.46 0 20.12 0 24c0 3.88.92 
                          7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 
                          15.89-5.81l-7.73-6c-2.15 1.45-4.92 
                          2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 
                          6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">Sign up with Google</span>
                </div>
              </button>
            </div>

            <div className="card-text" style={{ marginTop: "20px" }}>
              <p>Already have an account? <a href="/Login">Login here</a></p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}