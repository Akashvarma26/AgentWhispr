import './style/Styles.css'
import DarkModeToggle from '../components/DarkMode';

export function Contact(){
    return (
        <>
            <title>Agent Whispr - Contact</title>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Whispr">Agent Whispr</a></li>
                        <li><a href="/Contact" aria-current="page">Contact</a></li>
                        <li><a href="/Profile">Profile</a></li>
                    </ul>
                    <DarkModeToggle></DarkModeToggle>
                </nav>
            </header>

            <main>
                <section className="hero-section">
                    <div className="container">
                        <h1>Agent Whispr</h1>
                        <p className="tagline">Have questions, issues or feedback about the app? I'm always open to discuss the project — don't hesitate to get in touch.</p>
                    </div>
                </section>

                <section className="contact-info-section">
                    <div className="card p-4 shadow-lg contact-card">
                        <h2 className="mb-3 card-title">Connect with Me</h2>
                        <p className="card-text">
                            <strong>GitHub:</strong><br />
                            <a href="https://github.com/Akashvarma26" target="_blank" rel="noopener noreferrer">github.com/Akashvarma26</a>
                        </p>
                        <p className="card-text">
                            <strong>Email:</strong><br />
                            <a href="mailto:akashvdatla@gmail.com">akashvdatla@gmail.com</a>
                        </p>
                        <p className="card-text">
                            <strong>LinkedIn:</strong><br />
                            <a href="https://www.linkedin.com/in/akash-varma-datla-575998263/" target="_blank" rel="noopener noreferrer">linkedin.com/in/akash-varma-datla-575998263</a>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}