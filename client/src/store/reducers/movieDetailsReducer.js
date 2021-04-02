const initialState = {
  movieDetails: {},
};

export default function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MOVIE":
      return {
        ...state,
        movieDetails: action.payload,
      };
    case "CLEAR_MOVIE":
      return {
        ...state,
        movieDetails: {},
      };
    default:
      return state;
  }
}
