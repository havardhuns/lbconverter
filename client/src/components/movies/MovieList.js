import { useSelector, useDispatch } from "react-redux";
import Movie from "./Movie.js";
import { Grid } from "@material-ui/core";
import { getMovieDetails } from "../../store/actions/MovieDetailsAction";

const MovieList = () => {
  const movieList = useSelector((state) => state.movieList.movieList);

  const dispatch = useDispatch();
  const openMovie = (movie) => {
    dispatch(getMovieDetails(movie));
  };

  return (
    <div style={{ width: "80%", marginBottom: "20px" }}>
      <Grid container spacing={1}>
        {movieList.map((movie, i) => {
          return (
            <Grid item xs={1} spacing={1} key={i}>
              <Movie movie={movie} onClick={() => openMovie(movie)} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MovieList;
