export const setMovies = movieList => ({
  type: "GET_MOVIES",
  movieList: movieList
});

export const setSearchSuggestion = movieList => ({
  type: "SET_SEARCH_SUGGESTION",
  payload: movieList
});

export function getMovies(page, hideWatched, filter = {}) {
  return dispatch => {
    fetch("http://localhost:5000/movies?page=" + page + "&sort=rating" + (hideWatched ? "&lbfilter": "") + "&filter=" + JSON.stringify(filter))
      .then(response => response.json(), error => console.log(error))
      .then(movieList => {
        dispatch(setMovies(movieList));
      });
  };
}

export function search(searchString) {
  return dispatch => {
    dispatch(setMovies({ results: [], total_pages: 0, total_results: 0 }));
    fetch("http://localhost:5000/movies/search?search_string=" + searchString)
      .then(response => response.json(), error => console.log(error))
      .then(movieList => dispatch(setMovies(movieList)));
  };
}

export function getSearchSuggestions(searchString) {
  return dispatch => {
    fetch(
      "http://localhost:5000/movies/search?search_string=" +
        searchString +
        "&limit=6"
    )
      .then(response => response.json(), error => console.log(error))
      .then(movieList => dispatch(setSearchSuggestion(movieList.results)));
  };
}

export function clearSearchSuggestions() {
  return dispatch => {
    dispatch(setSearchSuggestion([]));
  };
}
