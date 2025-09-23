import './style/NotFound.css'
import './style/Styles.css'

export function NotFound(){
    return (
        <>
            <title>Agent Whispr - Not Found</title>
            <h1 className="nf-h1">Webpage Not Found, Agent!</h1>
            <p>Maybe try <a href="http://localhost:5173/">clicking here</a> to get directed to homepage</p>
            <img className="agent-img" src='./homepage.png' alt="Agent Whispr logo" />
        </>
    );
}