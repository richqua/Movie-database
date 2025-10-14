import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const moods = [
  { mood: "Happy", query: "Comedy", color: "#FFD93D" },
  { mood: "Sad", query: "Drama", color: "#6C63FF" },
  { mood: "Excited", query: "Action", color: "#FF6B6B" },
  { mood: "Romantic", query: "Romance", color: "#FF4081" },
  { mood: "Curious", query: "Sci-Fi", color: "#29B6F6" },
];

export default function LandingPage() {
  const [selectedMood, setSelectedMood] = useState("");
  const navigate = useNavigate();

  const handleMoodSelect = (query) => {
    setSelectedMood(query);
    navigate(`/home?mood=${query}`);
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to CineVerse 🎬</h1>
      <p className="landing-subtitle">
        Feeling something today? Let’s match your mood with the perfect movie.
      </p>

      <div className="mood-section">
        <h2 className="mood-title">What’s your vibe?</h2>
        <div className="mood-grid">
          {moods.map((m, index) => (
            <button
              key={index}
              className={`mood-btn ${selectedMood === m.query ? "active" : ""}`}
              style={{ backgroundColor: selectedMood === m.query ? m.color : "#1a1a1a" }}
              onClick={() => handleMoodSelect(m.query)}
            >
              {m.mood}
            </button>
          ))}
        </div>
      </div>

      <footer className="landing-footer">
        <p>© 2025 CineVerse | Movies tailored to your mood</p>
      </footer>
    </div>
  );
}
