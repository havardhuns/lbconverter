const initialState = {
  movieList: [],
  searchSuggestions: [],
  numberOfPages: 0
};

export default function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MOVIES":
      console.log(action.movieList.results);

      return {
        ...state,
        movieList: action.movieList.results,
        numberOfPages: action.movieList.total_pages
      };
    case "SET_SEARCH_SUGGESTION":
      return {
        ...state,
        searchSuggestions: action.payload
      };
    default:
      return state;
  }
}
