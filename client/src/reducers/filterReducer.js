const initialState = {
    genres: [],
    productionCompanies: [],
    certifications: [{name: "18", value: "18"}]
  };
  
  export default function movieListReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_GENRES":
        return {
          ...state,
          genres: action.genres,
        };
    case "GET_PRODUCTION_COMPANIES":
        return {
            ...state,
            productionCompanies: action.productionCompanies,
        };
      default:
        return state;
    }
  }
  