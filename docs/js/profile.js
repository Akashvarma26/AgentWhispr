import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

let auth;

// Securely load Firebase config from backend
async function initFirebase() {
  try {
    const res = await fetch("http://localhost:8000/firebase-config");
    const config = await res.json();

    const app = initializeApp(config);
    auth = getAuth(app);

    setupAuthObserver();
  } catch (err) {
    console.error("❌ Failed to load Firebase config:", err);
    alert("Could not load Firebase setup. Please try again.");
  }
}

// Set up auth state listener
function setupAuthObserver() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById('profileCard').style.display = 'flex';
      document.getElementById('userName').innerText = user.displayName || "User";
      document.getElementById('userEmail').innerText = user.email;
      document.getElementById('userPic').src = user.photoURL || "assets/homepage2.png";
    } else {
      window.location.href = "login.html"; // Not logged in
    }
  });
}

// Logout function
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
};

// Init
await initFirebase();