# Agent Whispr

A real-time voice AI assistant web application that provides intelligent, conversational responses through voice interaction. Built with React frontend and powered by Vapi AI for seamless voice communication.

## Features

- **Real-time Voice Interaction**: Powered by Vapi AI with natural voice conversations
- **User Authentication**: Firebase authentication with email/password and Google sign-in
- **Modern Web Interface**: React-based frontend with dark mode support
- **User Profile Management**: Personalized user profiles with Firebase Firestore
- **Responsive Design**: Clean, user-friendly interface with navigation
- **Real-time Transcription**: Live display of conversation transcripts
- **Voice Assistant Integration**: Direct integration with Vapi AI assistant

## Tech Stack

- **React 19** - Modern UI framework with hooks
- **Vite** - Fast build tool and development server
- **React Router 7** - Client-side routing and navigation
- **Firebase** - Authentication and Firestore database
- **Vapi AI** - Voice AI assistant integration
- **CSS3** - Custom styling with dark mode support
- **Bootstrap 4** - UI component framework

## Project Structure

```
agentwhispr/
├── src/
│   ├── components/          # Reusable components
│   │   └── DarkMode.jsx    # Dark mode toggle component
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Whispr.jsx      # Main voice assistant interface
│   │   ├── Login.jsx       # User login page
│   │   ├── SignUp.jsx      # User registration page
│   │   ├── Profile.jsx     # User profile page
│   │   ├── Contact.jsx     # Contact information page
│   │   ├── NotFound.jsx    # 404 error page
│   │   └── style/          # CSS stylesheets
│   ├── firebaseconfig/     # Firebase configuration
│   │   └── firebase.js     # Firebase setup and exports
│   ├── App.jsx             # Main app component with routing
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
│   ├── defpfp.png         # Default profile picture
│   └── homepage.png       # Homepage logo
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── index.html             # HTML template
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Authentication and Firestore enabled
- Vapi AI account and assistant configuration

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd agentwhispr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
   VITE_VAPI_PRIVATE_KEY=your_vapi_private_key
   VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## Usage

### Getting Started
1. Visit the homepage to learn about Agent Whispr
2. Create an account using email/password or Google authentication
3. Navigate to the Agent Whispr page to start voice conversations
4. Click the microphone button to begin talking with the AI assistant

### Voice Assistant Features
- **Real-time Conversation**: Click the microphone to start/stop voice interaction
- **Live Transcription**: See your speech transcribed in real-time
- **Assistant Responses**: View AI responses both as text and voice
- **Call Status**: Visual indicators show connection status (idle, connecting, active, error)
- **Transcript Management**: Clear conversation history as needed

### Navigation
- **Home**: Landing page with project information
- **Agent Whispr**: Main voice assistant interface (requires authentication)
- **Profile**: View and manage user account information
- **Contact**: Developer contact information
- **Dark Mode**: Toggle between light and dark themes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## Authentication

The application uses Firebase Authentication with support for:
- Email and password registration/login
- Google OAuth sign-in
- User profile management with Firestore
- Protected routes requiring authentication

## Voice AI Integration

Agent Whispr integrates with Vapi AI to provide:
- Natural language voice conversations
- Real-time speech-to-text transcription
- Text-to-speech responses
- Contextual AI assistant capabilities
- Seamless voice interaction experience