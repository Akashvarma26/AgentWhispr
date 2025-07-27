import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let auth, db;

// Load Firebase config securely from FastAPI backend
async function loadFirebase() {
  try {
    const response = await fetch("http://localhost:8000/firebase-config");
    const firebaseConfig = await response.json();

    if (!firebaseConfig.apiKey) {
      throw new Error("Invalid Firebase config");
    }

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    console.log("✅ Firebase initialized");
  } catch (err) {
    console.error("❌ Failed to load Firebase config:", err);
    alert("Could not initialize Firebase.");
  }
}

await loadFirebase();

// Email and Password Signup
document.getElementById("signupbtn").addEventListener("click", async (event) => {
  event.preventDefault();

  const fullname = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const statusDiv = document.getElementById("Status-password");

  if (password !== confirmPassword) {
    statusDiv.innerText = "❌ Passwords do not match";
    statusDiv.style.color = "red";
    return;
  }

  if (password.length < 6) {
    statusDiv.innerText = "❌ Password must be at least 6 characters";
    statusDiv.style.color = "red";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: fullname });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullname: fullname,
      createdAt: new Date().toISOString()
    });

    alert("✅ New user created! Now login using the same credentials.");
    window.location.href = "login.html";
  } catch (error) {
    statusDiv.innerText = "❌ " + error.message;
    statusDiv.style.color = "red";
  }
});

// Google Auth
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