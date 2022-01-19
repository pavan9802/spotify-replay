import React, { useEffect } from "react";
import MainPage from "./Components/MainPage";
import Login from "./Components/Login";
import { getTokenFromResponse } from "./spotify";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { SpotifyState } from "./SpotifyContext";

const firebaseConfig = {
  apiKey: "AIzaSyDU5W9-p5e-v7ri7o-Qx9ceXyo717KPvTw",
  authDomain: "spotify-replay-e7c30.firebaseapp.com",
  projectId: "spotify-replay-e7c30",
  storageBucket: "spotify-replay-e7c30.appspot.com",
  messagingSenderId: "727765515963",
  appId: "1:727765515963:web:ea61feec7486aa3f0cb39e",
  measurementId: "G-NP8E9RBXP8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const { token, setToken } = SpotifyState();

  useEffect(() => {
    // Set token
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;
    setToken(_token);
  }, []);

  return <div className="app">{!token ? <Login /> : <MainPage />}</div>;
}

export default App;
