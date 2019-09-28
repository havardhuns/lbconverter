const initialState = {
  movieList: []
};

export default function movieListReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movieList: action.payload
      };
    default:
      return state;
  }
}
