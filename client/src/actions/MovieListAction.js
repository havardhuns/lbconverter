export const setMovies = movieList => ({
  type: "GET_MOVIES",
  payload: movieList
});

export function getMovies() {
  return dispatch => {
    fetch("http://localhost:5000/movies?page=1&pageto=4")
      .then(response => response.json(), error => console.log(error))
      .then(movieList => dispatch(setMovies(movieList)));
  };
}
