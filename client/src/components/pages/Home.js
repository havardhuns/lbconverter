import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../movies/MovieList";
import MovieDetails from "../movies/MovieDetails.js";
import Paginator from "../movies/Paginator.js";
import {
  getGenres,
  getProductionCompanies,
} from "../../store/actions/FilterAction";
import { getMovies } from "../../store/actions/MovieListAction";
import {
  getMovieDetails,
  clearMovieDetails,
} from "../../store/actions/MovieDetailsAction";
import { getLbMovies } from "../../store/actions/LbDataAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import { clearTorrents } from "../../store/actions/torrentAction";

const Home = () => {
  const movieList = useSelector((state) => state.movieList);
  const numberOfPages = useSelector((state) => state.movieList.numberOfPages);
  const movieDetails = useSelector((state) => state.movie.movieDetails);
  const checked = useSelector((state) => state.lbMovies.checked);

  const dispatch = useDispatch();

  const getFrontPageMovies = () =>
    dispatch(
      getMovies(1, checked, {
        votes: { $gt: 25000 },
      })
    );

  const openMovie = (movie) => {
    dispatch(getMovieDetails(movie));
  };

  useEffect(() => {
    getFrontPageMovies();
    dispatch(getLbMovies());
    dispatch(getGenres());
    dispatch(getProductionCompanies());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!movieList.loading ? (
        <MovieList movies={movieList.movieList} onClick={openMovie} />
      ) : (
        <div style={{ marginTop: 200 }}>
          <CircularProgress />
        </div>
      )}
      {numberOfPages > 0 && <Paginator pages={numberOfPages} />}
      {movieDetails._id && (
        <MovieDetails
          movie={movieDetails}
          close={() => {
            dispatch(clearMovieDetails());
            dispatch(clearTorrents());
          }}
        />
      )}
    </div>
  );
};

export default Home;
