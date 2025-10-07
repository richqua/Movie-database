const OMDB_API_KEY = "6a77cc3a";
const BASE_URL = "https://www.omdbapi.com/";

async function fetchMovies(searchTerm, page = 1) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&s=${searchTerm}&page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Response: "False", Error: "Network Error" };
  }
}

async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { Response: "False", Error: "Network Error" };
  }
}

export { fetchMovieDetails, fetchMovies };
