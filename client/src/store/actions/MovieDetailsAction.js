export const setMovie = (movie) => ({
  type: "GET_MOVIE",
  payload: movie,
});

export const clearMovie = () => ({
  type: "CLEAR_MOVIE",
});

export function getMovieDetails(movie) {
  return (dispatch) => {
    dispatch(setMovie(movie));
  };
}

export function clearMovieDetails() {
  return (dispatch) => {
    dispatch(clearMovie());
  };
}
