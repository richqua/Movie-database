import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Collapse immediately after clicking a link
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" onClick={closeMenu}>
          CineSearch
        </Link>
      </div>

      <button className="nav-toggle" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </button>

      <nav className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={closeMenu}
        >
          LandingPage
        </Link>

        <Link
          to="/home"
          className={location.pathname === "/home" ? "active" : ""}
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/logins"
          className={location.pathname === "/logins" ? "active" : ""}
          onClick={closeMenu}
        >
          Logins
        </Link>

        <Link
          to="/userprofile"
          className={location.pathname === "/userprofile" ? "active" : ""}
          onClick={closeMenu}
        >
          UserProfile
        </Link>
      </nav>
    </header>
  );
}
