import _ from "lodash";

const initialState = {
  genres: [],
  productionCompanies: [],
  certifications: [{ name: "18", value: "18" }],
  query: { votes: { $gt: 25000 } },
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
    case "UPDATE_QUERY":
      return {
        ...state,
        query: { ...state.query, ...action.payload },
      };
    case "REMOVE_FROM_QUERY":
      console.log(action.key);
      return {
        ...state,
        query: _.omit({ ...state.query }, action.key),
      };
    default:
      return state;
  }
}
