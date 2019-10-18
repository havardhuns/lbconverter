import { combineReducers } from "redux";
import movieList from "./movieListReducer.js";
import movie from "./movieDetailsReducer";
export default combineReducers({
  movieList,
  movie
});
