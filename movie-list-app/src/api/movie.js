const getAllMovies = async ( page, year,genres ) => {
  const requestOptions = {
    method: "GET",
  };
  // `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=primary_release_date.desc&primary_release_year=${year}&page=${page}&vote_count.gte=100&with_genres=${genres}`,
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=primary_release_date.desc&primary_release_year=${year}&page=${page}&vote_count.gte=100&with_genres=${genres}`,
    requestOptions
  ).then((response) => response.json())
};
const getGenre = async () => {
  const options = {
    method: "GET",
  };
  return await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=2dca580c2a14b55200e784d157207b4d",
    options
  )
    .then((response) => response.json())
};
export { getAllMovies, getGenre };
