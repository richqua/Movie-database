
export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/assets/no-image.jpg"}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p className="year">{movie.Year}</p>
        <p className="review">{movie.Review}</p>
      </div>
    </div>
  );
}
