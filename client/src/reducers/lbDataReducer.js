const initialState = {
    lbMovies: []
  };
  
  export default function lbDataReducer(state = initialState, action) {
    switch (action.type) {
    case "GET_LB_MOVIES":
        return {
          ...state,
          lbMovies: action.lbMovies
        };
    default:
        return state;
    }
  }
  