# Agent Whispr

A real-time voice AI assistant that provides intelligent, conversational responses with access to up-to-date information. Built with a React frontend and Python backend using LiveKit for real-time communication.

## Features

- **Real-time Voice Interaction**: Powered by OpenAI's Realtime API with natural voice conversations
- **Intelligent Responses**: AI assistant that provides accurate, contextual information
- **Modern Web Interface**: React-based frontend with dark mode support
- **Real-time Communication**: LiveKit integration for seamless audio streaming
- **Responsive Design**: Clean, user-friendly interface with navigation

## Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Firebase** - Authentication and backend services
- **CSS3** - Custom styling with dark mode support

### Backend
- **Python 3.12+** - Core backend language
- **LiveKit Agents** - Real-time communication framework
- **OpenAI API** - AI model integration with Realtime API
- **python-dotenv** - Environment variable management

## Project Structure

```
Agent-Whispr/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   └── components/      # Reusable components
│   ├── public/              # Static assets
│   └── package.json
├── Backend/                 # Python backend with LiveKit
│   ├── agent.py            # Main agent implementation
│   ├── pyproject.toml      # Python dependencies
│   └── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- OpenAI API key
- LiveKit account and credentials

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   # source .venv/bin/activate  # macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your credentials:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   LIVEKIT_URL=your_livekit_url
   LIVEKIT_API_KEY=your_livekit_api_key
   LIVEKIT_API_SECRET=your_livekit_api_secret
   ```

5. Run the agent:
   ```bash
   python agent.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file for your configuration:
   ```env
   VITE_LIVEKIT_URL=your_livekit_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## Usage

1. Start both the backend agent and frontend development server
2. Navigate to the Agent Whispr page in your browser
3. Allow microphone permissions when prompted
4. Start speaking to interact with the AI assistant
5. The agent will greet you and respond to your questions in real-time

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend Commands
- `pip install -r requirements.txt` - Install dependencies