export const setMovies = movieList => ({
  type: "GET_MOVIES",
  payload: movieList
});

export function getMovies() {
  return dispatch => {
    fetch("http://localhost:5000/movies")
      .then(response => response.json(), error => console.log(error))
      .then(movieList => dispatch(setMovies(movieList)));
  };
}
