import { GET_MOVIES_BEGIN, GET_MOVIES_SUCCESS } from "../actionTypes";

export const setMovies = (movieList) => ({
  type: "SET_MOVIES",
  movieList: movieList,
});

export const getMoviesBegin = () => ({
  type: GET_MOVIES_BEGIN,
});

export const getMoviesSuccess = (movieList) => ({
  type: GET_MOVIES_SUCCESS,
  movieList: movieList,
});

export const setSearchSuggestion = (movieList) => ({
  type: "SET_SEARCH_SUGGESTION",
  payload: movieList,
});

export const clearMovies = () => ({
  type: "CLEAR_MOVIES",
});

export function getMovies(page, hideWatched, filter = {}) {
  return (dispatch) => {
    if (page === 1) {
      dispatch(clearMovies());
    }
    dispatch(getMoviesBegin());
    fetch(
      "/api/movies?page=" +
        page +
        "&sort=rating" +
        (hideWatched ? "&lbfilter" : "") +
        "&filter=" +
        JSON.stringify(filter)
    )
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((movieList) => {
        dispatch(getMoviesSuccess(movieList));
      });
  };
}

export function search(searchString) {
  return (dispatch) => {
    dispatch(setMovies({ results: [], total_pages: 0, total_results: 0 }));
    fetch("/api/movies/search?search_string=" + searchString)
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((movieList) => dispatch(setMovies(movieList)));
  };
}

export function getSearchSuggestions(searchString) {
  return (dispatch) => {
    fetch("/api/movies/search?search_string=" + searchString + "&limit=6")
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((movieList) => dispatch(setSearchSuggestion(movieList.results)));
  };
}

export function clearSearchSuggestions() {
  return (dispatch) => {
    dispatch(setSearchSuggestion([]));
  };
}
