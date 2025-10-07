
import { useEffect, useState } from "react";
import { fetchMovies } from "../API/keys";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const popularQueries = ["Avengers", "Batman", "Spiderman", "Inception", "Harry Potter", "Matrix", "Jurassic Park"];

  const handleSearch = async (query) => {
    setError("");
    let allMovies = [];

    try {
      // Fetch multiple pages for variety
      for (let page = 1; page <= 2; page++) {
        const data = await fetchMovies(`${query}&page=${page}`);
        if (data.Response === "True") {
          allMovies = [...allMovies, ...data.Search];
        }
      }

      setMovies(allMovies);
    } catch (err) {
      console.error(err);
      setError("Error fetching movies.");
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      let allMovies = [];

      for (const q of popularQueries) {
        const data = await fetchMovies(q);
        if (data.Response === "True") {
          allMovies = [...allMovies, ...data.Search];
        }
      }

      setMovies(allMovies);
    };

    loadMovies();
  }, []);

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          !error && <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
