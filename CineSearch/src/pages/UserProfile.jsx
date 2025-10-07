
import { Link } from "react-router-dom";
import "../App.css";

function UserProfile() {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src="https://i.pravatar.cc/120"
          alt="User Avatar"
          className="profile-pic"
        />
        <div className="profile-info">
          <h3>Richard</h3>
          <p>Movie Enthusiast</p>
        </div>
      </div>

      <div className="profile-links">
        <Link to="/account">My Account</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/logout" className="logout-link">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
