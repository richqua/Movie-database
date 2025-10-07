
import { Link } from "react-router-dom";
import "../App.css"; // ensures consistent styles

function LandingPage() {
  return (
    <section className="landing">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1 className="landing-title">
            Welcome to <span>CineSearch</span>
          </h1>
          <p className="landing-tagline">
            Discover, explore, and dive into the universe of your favorite movies.
          </p>

          <div className="landing-buttons">
            <Link to="/home" className="btn explore-btn">
              🎬 Explore Movies
            </Link>
            <Link to="/login" className="btn login-btn">
              🔑 Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
