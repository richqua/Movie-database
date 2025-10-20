import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ added navigate
import { fetchMovies } from "../API/keys";
import "../App.css";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ added for handling searches
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract mood from query params
  const params = new URLSearchParams(location.search);
  const moodQuery = params.get("mood") || "Action";

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      let allMovies = [];
      const yearLimit = new Date().getFullYear() - 5; // last 5 years

      try {
        // Fetch multiple pages to get more results
        for (let page = 1; page <= 3; page++) {
          const data = await fetchMovies(moodQuery, page);
          if (data.Response === "True" && Array.isArray(data.Search)) {
            const recentMovies = data.Search.filter((m) => {
              const year = parseInt(m.Year?.split("–")[0]);
              return !isNaN(year) && year >= yearLimit;
            });
            allMovies = [...allMovies, ...recentMovies];
          }
        }
        setMovies(allMovies);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [moodQuery]);

  // ✅ Handle search submissions
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`?mood=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">
        {moodQuery} Movies (Recent Releases)
      </h1>

      {/* ✅ Added Search Bar */}
      <SearchBar onSearch={handleSearch} defaultValue={moodQuery} />

      {loading ? (
        <p className="loading">Loading movies...</p>
      ) : movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="no-results">No recent movies found for this mood.</p>
      )}
    </div>
  );
}

export default Home;