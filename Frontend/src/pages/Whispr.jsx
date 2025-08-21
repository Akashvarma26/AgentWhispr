import './style/Styles.css'
import DarkModeToggle from '../components/DarkMode';

export function Whispr(){
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
                <DarkModeToggle></DarkModeToggle>
                </nav>
            </header>
            <h1>Hello!</h1>
        </>
    );
}