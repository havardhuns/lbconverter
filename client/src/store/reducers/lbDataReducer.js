const initialState = {
  lbMovies: [],
  checked: false,
};

export default function lbDataReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_LB_MOVIES":
      return {
        ...state,
        lbMovies: action.lbMovies,
      };
    case "SET_CHECKED":
      return {
        ...state,
        checked: action.payload,
      };
    default:
      return state;
  }
}
