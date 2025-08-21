import './style/Styles.css'
import DarkModeToggle from '../components/DarkMode';
export function Home(){
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><a href="/" aria-current="page">Home</a></li>
                        <li><a href="/Whispr">Agent Whispr</a></li>
                        <li><a href="/Contact">Contact</a></li>
                        <li><a href="/Profile">Profile</a></li>
                    </ul>
                    <DarkModeToggle></DarkModeToggle>
                </nav>
            </header>

            <main>
                <section className="hero-section">
                    <div className="container">
                        <h1>Agent Whispr</h1>
                        <p className="tagline">Your AI-powered voice assistant that listens, understands, and speaks back — all with a whisper of intelligence.</p>
                    </div>
                </section>

                <section id="agent-whispr-section" className="intro-section">
                    <div className="intro-content">
                        <p className="intro-text">
                            <strong>Agent Whispr</strong> is a next-generation AI agent designed to interact with you using natural voice — not just typed text. Speak your queries, and Agent Whispr listens, understands, and responds — all through seamless speech-to-text (STT) and text-to-speech (TTS) capabilities. Whether you're asking for the latest news, running advanced searches, using productivity tools, or just having a casual chat — Agent Whispr is your whisper-smart assistant with access to the internet, smart tools, and contextual memory.
                        </p>
                        <img className="agent-img" src="./homepage.png" alt="Agent Whispr logo" />
                    </div>
                </section>
            </main>
        </>
    );
}