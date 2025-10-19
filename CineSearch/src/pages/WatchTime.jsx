import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../API/keys.js";
import "../App.css";

function WatchTime() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Load movie details
  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch {
        setError("Network error while fetching movie.");
      }
    }
    loadMovie();
  }, [id]);

  // Load local chat history
  useEffect(() => {
    const stored = localStorage.getItem(`chat_${id}`);
    setMessages(stored ? JSON.parse(stored) : []);
  }, [id]);

  // Auto-scroll to last message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const message = {
      text: newMessage,
      user: "Guest",
      timestamp: new Date().toLocaleString(),
    };
    const updated = [...messages, message];
    setMessages(updated);
    localStorage.setItem(`chat_${id}`, JSON.stringify(updated));
    setNewMessage("");
  };

  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="loading">Loading movie...</p>;

  return (
    <section className="watch-page">
      <div className="watch-container">
        <div className="watch-left">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="watch-poster"
          />
        </div>

        <div className="watch-right">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>

          <div className="chat-box">
            <h3>Live Chat</h3>
            <div className="chat-messages">
              {messages.length === 0 ? (
                <p className="no-messages">Chat with those watching with you!</p>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className="chat-message">
                    <strong>{m.user}</strong>: {m.text}
                    <div className="chat-time">{m.timestamp}</div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
              <textarea
                rows={2}
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WatchTime;