const OMDB_API_KEY = "6a77cc3a";
const BASE_URL = "https://www.omdbapi.com/";

async function fetchMovies(searchTerm) {
  try {
    let allMovies = [];

    // Fetch up to 3 pages (10 movies per page)
    for (let page = 1; page <= 3; page++) {
      const response = await fetch(
        `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${searchTerm}&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        allMovies = [...allMovies, ...data.Search];
      } else break;
    }

    // Add ratings/reviews per movie
    const detailedMovies = await Promise.all(
      allMovies.map(async (movie) => {
        const details = await fetchMovieDetails(movie.imdbID);
        return {
          ...movie,
          imdbRating: details.imdbRating || "N/A",
          Review: details.imdbRating
            ? `IMDb Rating: ${details.imdbRating}/10`
            : "No reviews available",
        };
      })
    );

    return { Response: "True", Search: detailedMovies };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Response: "False", Error: "Network Error" };
  }
}

async function fetchMovieDetails(id) {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { Response: "False", Error: "Network Error" };
  }
}

export { fetchMovieDetails, fetchMovies };
