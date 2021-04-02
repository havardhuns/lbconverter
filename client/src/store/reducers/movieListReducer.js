import { GET_MOVIES_BEGIN, GET_MOVIES_SUCCESS } from "../actionTypes";

const initialState = {
  movieList: null,
  numberOfPages: 0,
  totalResults: 0,
  loading: true,
  searchSuggestions: [],
};

export default function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movieList: action.movieList.results,
        numberOfPages: action.movieList.total_pages,
        totalResults: action.movieList.total_results,
        loading: false,
      };

    case "SET_MOVIES":
      return {
        ...state,
        movieList: action.movieList.results,
        numberOfPages: action.movieList.total_pages,
      };

    case "SET_SEARCH_SUGGESTION":
      return {
        ...state,
        searchSuggestions: action.payload,
      };
    default:
      return state;
  }
}
