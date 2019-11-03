import { combineReducers } from "redux";
import movieList from "./movieListReducer.js";
import movie from "./movieDetailsReducer";
import torrentList from "./torrentListReducer";
export default combineReducers({
  movieList,
  movie,
  torrentList
});
