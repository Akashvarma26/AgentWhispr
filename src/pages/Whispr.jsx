import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import Vapi from "@vapi-ai/web";
import "./style/Styles.css";
import DarkModeToggle from "../components/DarkMode";

export function Whispr() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [assistantResponse, setAssistantResponse] = useState("");
    const [vapi, setVapi] = useState(null);
    const [callStatus, setCallStatus] = useState("idle");

    // 🔑 Firebase Auth listener
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

    // 🔑 Initialize Vapi with environment variables
    useEffect(() => {
        const vapiInstance = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
        setVapi(vapiInstance);

        // Event listeners for call status
        vapiInstance.on("call-start", () => {
            setIsCallActive(true);
            setIsConnecting(false);
            setCallStatus("active");
            console.log("Call started");
        });

        vapiInstance.on("call-end", () => {
            setIsCallActive(false);
            setIsConnecting(false);
            setCallStatus("ended");
            console.log("Call ended");
        });

        vapiInstance.on("speech-start", () => {
            console.log("User started speaking");
        });

        vapiInstance.on("speech-end", () => {
            console.log("User stopped speaking");
        });

        // Handle user transcript (what user says)
        vapiInstance.on("transcript", (transcript) => {
            if (transcript.type === "partial") {
                setTranscript(transcript.transcript);
            } else if (transcript.type === "final") {
                setTranscript(transcript.transcript);
            }
        });

        // Handle assistant messages (what AI responds)
        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.role === "assistant") {
                setAssistantResponse(message.transcript);
            }
        });

        vapiInstance.on("error", (error) => {
            console.error("Vapi error:", error);
            setIsCallActive(false);
            setIsConnecting(false);
            setCallStatus("error");
        });

        return () => {
            vapiInstance.removeAllListeners();
        };
    }, []);

    // 🔑 Start/Stop call with assistant
    const toggleCall = async () => {
        if (!vapi) return;

        if (isCallActive) {
            // End the call
            vapi.stop();
            setTranscript("");
            setAssistantResponse("");
        } else {
            // Start the call
            setIsConnecting(true);
            setCallStatus("connecting");
            setTranscript("");
            setAssistantResponse("");

            try {
                await vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID);
            } catch (error) {
                console.error("Failed to start call:", error);
                setIsConnecting(false);
                setCallStatus("error");
            }
        }
    };

    // Clear transcript
    const clearTranscript = () => {
        setTranscript("");
        setAssistantResponse("");
    };

    // 🔑 Logout
    const logout = () => {
        signOut(auth)
            .then(() => {
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error("Logout Error:", error);
            });
    };

    // 🔑 Show loading while checking auth
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    color: "var(--textclr)",
                }}
            >
                Loading...
            </div>
        );
    }

    // 🔑 Main UI
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Whispr" aria-current="page">Agent Whispr</a></li>
                        <li><a href="/Contact">Contact</a></li>
                        <li><a href="/Profile">Profile</a></li>
                    </ul>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <DarkModeToggle />
                        <button
                            onClick={logout}
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: 9,
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </header>

            <div className="vapi-container" style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "20px",
                color: "var(--textclr)"
            }}>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    color: "var(--textclr)"
                }}>
                    Hello, {user?.displayName || user?.email || "User"}!
                </h1>

                <p style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    fontSize: "18px",
                    opacity: 0.8
                }}>
                    Welcome to Agent Whispr - Your AI Voice Assistant
                </p>

                {/* Call Status Indicator */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "20px"
                }}>
                    <div className={`vapi-status-indicator ${callStatus === "connecting" ? "vapi-connecting" : ""}`} style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        backgroundColor:
                            callStatus === "active" ? "#4CAF50" :
                                callStatus === "connecting" ? "#FF9800" :
                                    callStatus === "error" ? "#f44336" : "#9E9E9E",
                        color: "white"
                    }}>
                        {callStatus === "active" && "🟢 Connected & Listening"}
                        {callStatus === "connecting" && "🟡 Connecting..."}
                        {callStatus === "error" && "🔴 Connection Error"}
                        {callStatus === "idle" && "⚪ Ready to Connect"}
                        {callStatus === "ended" && "⚪ Call Ended"}
                    </div>
                </div>

                {/* Main Control Button */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}>
                    <button
                        className="vapi-main-button"
                        onClick={toggleCall}
                        disabled={isConnecting}
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            border: "none",
                            fontSize: "24px",
                            fontWeight: "bold",
                            cursor: isConnecting ? "not-allowed" : "pointer",
                            backgroundColor:
                                isCallActive ? "#f44336" :
                                    isConnecting ? "#FF9800" : "#4cacafff",
                            color: "white",
                            boxShadow: isCallActive ?
                                "0 0 30px rgba(244, 67, 54, 0.5)" :
                                "0 8px 16px rgba(0,0,0,0.2)",
                            transition: "all 0.3s ease",
                            transform: isCallActive ? "scale(1.05)" : "scale(1)",
                            position: "relative",
                            zIndex: 1
                        }}
                        onMouseOver={(e) => {
                            if (!isConnecting) {
                                e.target.style.transform = "scale(1.1)";
                                e.target.style.boxShadow = isCallActive ?
                                    "0 0 40px rgba(244, 67, 54, 0.7)" :
                                    "0 12px 24px rgba(0,0,0,0.3)";
                            }
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = isCallActive ? "scale(1.05)" : "scale(1)";
                            e.target.style.boxShadow = isCallActive ?
                                "0 0 30px rgba(244, 67, 54, 0.5)" :
                                "0 8px 16px rgba(0,0,0,0.2)";
                        }}
                    >
                        {isConnecting ? (
                            <>
                                <div className="vapi-connecting">🔄</div>
                                <div style={{ fontSize: "14px" }}>Connecting...</div>
                            </>
                        ) : isCallActive ? (
                            <>
                                <div>🛑</div>
                                <div style={{ fontSize: "14px" }}>End Call</div>
                            </>
                        ) : (
                            <>
                                <div>🎙️</div>
                                <div style={{ fontSize: "14px" }}>Start Talking</div>
                            </>
                        )}
                    </button>
                </div>

                {/* Control Buttons */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center"
                }}>
                    <button
                        className="vapi-control-button"
                        onClick={clearTranscript}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "var(--navbar-bgcolor)",
                            color: "var(--textclr)",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        🗑️ Clear Transcript
                    </button>
                </div>

                {/* Live Transcription Display */}
                <div className="vapi-grid" style={{
                    marginBottom: "20px"
                }}>
                    <div className={`vapi-transcript-box ${assistantResponse ? 'active' : ''}`} style={{
                        padding: "20px",
                        backgroundColor: "var(--navbar-bgcolor)",
                        borderRadius: "12px",
                        minHeight: "150px",
                        width:"760px",
                        border: "2px solid #4CAF50",
                        position: "relative"
                    }}>
                        <h3 style={{
                            margin: "0 0 15px 0",
                            color: "var(--textclr)",
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            🤖 Assistant:
                            {isCallActive && (
                                <span style={{
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#FF9800",
                                    borderRadius: "50%",
                                    animation: "pulse 1s infinite"
                                }}></span>
                            )}
                        </h3>
                        <div style={{
                            color: "var(--textclr)",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            minHeight: "100px",
                            padding: "10px",
                            backgroundColor: "rgba(76, 175, 80, 0.1)",
                            borderRadius: "8px",
                            fontStyle: assistantResponse ? "normal" : "italic",
                            opacity: assistantResponse ? 1 : 0.6,
                            wordWrap: "break-word"
                        }}>
                            {assistantResponse || "Assistant responses will appear here..."}
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="vapi-instructions" style={{
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "center"
                }}>
                    <h4 style={{
                        margin: "0 0 10px 0",
                        color: "var(--textclr)"
                    }}>
                        💡 How to use:
                    </h4>
                    <p style={{
                        margin: "0",
                        color: "var(--textclr)",
                        opacity: 0.8,
                        fontSize: "14px"
                    }}>
                        Click the microphone button to start a conversation with your AI assistant.
                        Speak naturally and see words transcribed in real-time with the assistant's responses.
                        The assistant will respond with voice and text.
                    </p>
                </div>
            </div>
        </>
    );
}