// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-logo">
          🎬 CineVerse
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>

        {/* Collapsible Navigation */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Landing Page
          </Link>
          <Link to="/home" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/logins" onClick={closeMenu}>
            Logins
          </Link>
          <Link to="/userprofile" onClick={closeMenu}>
            User Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
