const initialState = {
  currentRoute: null,
};

export default function routerReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_ROUTE":
      return {
        ...state,
        currentRoute: action.payload,
      };
    default:
      return state;
  }
}
