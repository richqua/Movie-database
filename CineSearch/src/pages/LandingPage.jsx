import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  const [selectedMood, setSelectedMood] = useState("");
  const navigate = useNavigate();

  // mood mappings
  const moods = [
    { mood: "HAPPY", queries: ["Comedy", "Adventure", "Family", "Animation"], color: "#FFD93D" },
    { mood: "SAD", queries: ["Drama", "Romance", "Tragedy"], color: "#6C63FF" },
    { mood: "Excited", queries: ["Action", "Thriller", "Superhero"], color: "#FF6B6B" },
    {
      mood: "Curious",
      queries: ["Sci-Fi", "Mystery", "Fantasy", "Documentary", "Crime", "Biography"],
      color: "#29B6F6",
    },
    { mood: "Romantic", queries: ["Romance", "Musical", "Comedy"], color: "#FF4081" },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.mood);

    // 🎲 Randomize “Curious” and other multi-genre moods
    const query =
      mood.queries.length > 1
        ? mood.queries[Math.floor(Math.random() * mood.queries.length)]
        : mood.queries[0];

    navigate(`/home?mood=${encodeURIComponent(query)}`);
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to CineSearch 🎬</h1>
      <p className="landing-subtitle">
        Feeling something today? Let’s match your mood with the perfect movie.
      </p>

      <div className="mood-section">
        <h2 className="mood-title">What’s your vibe?</h2>
        <div className="mood-grid">
          {moods.map((m, index) => (
            <button
              key={index}
              className={`mood-btn ${selectedMood === m.mood ? "active" : ""}`}
              style={{
                backgroundColor: selectedMood === m.mood ? m.color : "#1a1a1a",
                border: `2px solid ${m.color}`,
              }}
              onClick={() => handleMoodSelect(m)}
            >
              {m.mood}
            </button>
          ))}
        </div>
      </div>

      <footer className="landing-footer">
        <p>© 2025 CineSearch | Movies tailored to your mood</p>
      </footer>
    </div>
  );
}
