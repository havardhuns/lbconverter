import { combineReducers } from "redux";
import movieList from "./movieListReducer.js";
import movie from "./movieDetailsReducer";
import torrentList from "./torrentReducer";
import lbMovies from "./lbDataReducer";
import filters from "./filterReducer";
import route from "./routerReducer";

const rootReducer = combineReducers({
  movieList,
  movie,
  torrentList,
  lbMovies,
  filters,
  route,
});

export default rootReducer;
