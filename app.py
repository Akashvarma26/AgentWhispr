# Importing required libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
load_dotenv()

# App Initialization
app = FastAPI(
    title="Agent Whispr",
    description="Agent voice assistant based on Livekit",
    version="0.1.0"
)

# Origins
origins=[
    "http://localhost:5500"
]

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# api keys Auth for Signup and login
@app.get("/firebase-config",tags=["Firebase Auth"])
def firebase_config():
    return {
        "apiKey": os.getenv("apiKey"),
        "authDomain": os.getenv("authDomain"),
        "projectId": os.getenv("projectId"),
        "storageBucket": os.getenv("storageBucket"),
        "messagingSenderId": os.getenv("messagingSenderId"),
        "appId": os.getenv("appId")
    }