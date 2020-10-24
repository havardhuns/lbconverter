import { combineReducers } from "redux";
import movieList from "./movieListReducer.js";
import movie from "./movieDetailsReducer";
import torrentList from "./torrentListReducer";
import lbMovies from "./lbDataReducer";
import filters from "./filterReducer"

export default combineReducers({
  movieList,
  movie,
  torrentList,
  lbMovies,
  filters
});
