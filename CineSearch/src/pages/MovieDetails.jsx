import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../API/keys.js";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setError("");
      const data = await fetchMovieDetails(id);
      if (!mounted) return;
      if (data && data.Response === "True") {
        setMovie(data);
      } else if (data && data.Error) {
        setError(data.Error);
      } else {
        setError("Unable to load movie details.");
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="loading">Loading...</p>;

  return (
    <section className="movie-details">
      <div className="details-container">
        <img
          className="details-poster"
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
        />
        <div className="details-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          {movie.Ratings?.length > 0 && (
            <>
              <h4>Ratings</h4>
              <ul>
                {movie.Ratings.map((r, i) => <li key={i}>{r.Source}: {r.Value}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
