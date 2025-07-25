import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
// Firebase Config


// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Button handler
const signupBtn = document.getElementById("signupbtn");

signupBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const fullname = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const statusDiv = document.getElementById("Status-password");

  // Password Validation
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

  // Create user
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: fullname
      });

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullname: fullname,
        createdAt: new Date().toISOString()
      });

      alert("✅ New user created! Now login using the same credentials.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      statusDiv.innerText = "❌ " + error.message;
      statusDiv.style.color = "red";
    });
});

const provider = new GoogleAuthProvider();

document.getElementById("googleauth").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Optional: save to Firestore (if first time)
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