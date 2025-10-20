import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Logins from "./pages/Logins";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import WatchTime from "./pages/WatchTime";

function App() {
  return (
    <Router>
      
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logins" element={<Logins />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/watch/:id" element={<WatchTime />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;