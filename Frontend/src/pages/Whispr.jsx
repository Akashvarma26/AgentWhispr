import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import './style/Styles.css'
import DarkModeToggle from '../components/DarkMode';

export function Whispr() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
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
    // Show loading while checking auth
    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "var(--textclr)"
            }}>
                Loading...
            </div>
        );
    }

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Whispr" aria-current="page">Agent Whispr</a></li>
                        <li><a href= "/Contact">Contact</a></li>
                        <li><a href="/Profile">Profile</a></li>
                    </ul>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <DarkModeToggle></DarkModeToggle>
                        <button onClick={logout} style={{ backgroundColor: "red", color: "white", borderRadius: 9 }}>Logout</button>
                    </div>
                </nav>
            </header>
            <h1 style={{ color: "var(--textclr)" }}>
                Hello, {user?.displayName || user?.email || "User"}!
            </h1>
            <div style={{ padding: "20px", color: "var(--textclr)" }}>
                <p>Welcome to Agent Whispr</p>
                
            </div>
        </>
    );
}