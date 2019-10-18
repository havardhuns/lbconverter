export const setMovie = movie => ({
  type: "GET_MOVIE",
  payload: movie
});

export const clearMovie = () => ({
  type: "CLEAR_MOVIE"
});

export function getMovieDetails(id) {
  return dispatch => {
    fetch("http://localhost:5000/movie?movieid=" + id)
      .then(response => response.json(), error => console.log(error))
      .then(movie => dispatch(setMovie(movie)));
  };
}

export function clearMovieDetails() {
  return dispatch => {
    dispatch(clearMovie());
  };
}
