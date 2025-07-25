import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
    document.getElementById('profileCard').style.display = 'flex';
    document.getElementById('userName').innerText = user.displayName || "User";
    document.getElementById('userEmail').innerText = user.email;
    document.getElementById('userPic').src = user.photoURL || "assets/homepage2.png";
    } else {
    window.location.href = "login.html"; // Redirect if not logged in
    }
});

window.logout = function () {
    signOut(auth).then(() => {
    window.location.href = "login.html";
    }).catch((error) => {
    console.error("Logout Error:", error);
    });
}