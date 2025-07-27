import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let auth, db;

// Load Firebase config securely from backend
async function initFirebase() {
  try {
    const res = await fetch("http://localhost:8000/firebase-config");
    const config = await res.json();

    const app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);

    console.log("✅ Firebase Initialized");
  } catch (err) {
    console.error("❌ Firebase init failed:", err);
    alert("Could not initialize Firebase");
  }
}

await initFirebase();

// Email and Password Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Logged in successfully!");
    window.location.href = "profile.html";
  } catch (error) {
    alert("❌ " + error.message);
  }
});

// Google Auth Login
document.getElementById("googleauth").addEventListener("click", async () => {
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
        createdAt: new Date().toISOString()
      });
    }

    alert("✅ Logged in with Google!");
    window.location.href = "profile.html";
  } catch (error) {
    alert("❌ Google Auth Error: " + error.message);
  }
});