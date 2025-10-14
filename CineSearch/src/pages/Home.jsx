import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMovies } from "../API/keys";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mood = params.get("mood");

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(mood || "Popular");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      const data = await fetchMovies(searchTerm);
      if (data.Response === "True") setMovies(data.Search);
      else setMovies([]);
      setLoading(false);
    }
    loadMovies();
  }, [searchTerm]);

  return (
    <div className="home-container">
      <SearchBar onSearch={setSearchTerm} defaultValue={searchTerm} />
      {loading ? (
        <p className="loading">Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
          ) : (
            <p className="no-results">No movies found for "{searchTerm}"</p>
          )}
        </div>
      )}
    </div>
  );
}
