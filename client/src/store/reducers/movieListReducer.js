import { GET_MOVIES_BEGIN, GET_MOVIES_SUCCESS } from "../actionTypes";

const initialState = {
  movieList: [],
  numberOfPages: 0,
  totalResults: 0,
  loading: true,
  searchSuggestions: [],
  lastPageLoaded: 0,
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
        movieList: [...state.movieList, ...action.movieList.results],
        numberOfPages: action.movieList.total_pages,
        totalResults: action.movieList.total_results,
        lastPageLoaded: action.movieList.page,
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
    case "CLEAR_MOVIES":
      return initialState;
    default:
      return state;
  }
}
