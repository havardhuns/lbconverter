import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";
import MaterialIcon from "material-icons-react";
import {
  getMovies,
  search,
  getSearchSuggestions,
  clearSearchSuggestions,
} from "../../store/actions/MovieListAction";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetails } from "../../store/actions/MovieDetailsAction";
import OutsideClickHandler from "react-outside-click-handler";

const SearchField = withStyles((theme) => ({
  input: {
    borderRadius: 40,
    border: "1px solid rgba(255,255,255,0.1)",

    backgroundColor: "#0c3653",
    color: "white",
    fontSize: 25,
    margin: "0",
    outline: "none",
  },
  notchedOutline: {
    border: "none",
    outline: "none",
  },
}))(OutlinedInput);

const MovieSearch = () => {
  const searchSuggestions = useSelector(
    (state) => state.movieList.searchSuggestions
  );
  const checked = useSelector((state) => state.lbMovies.checked);
  const query = useSelector((state) => state.filters.query);

  const [currentTextInput, setCurrentTextInput] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);

  const dispatch = useDispatch();

  const getMoviesFromInput = () => {
    dispatch(clearSearchSuggestions());
    if (currentTextInput !== "") {
      dispatch(search(currentTextInput));
    } else {
      dispatch(getMovies(1, checked, query));
    }
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      getMoviesFromInput();
    }
  };

  const onTextInput = (event) => {
    setCurrentTextInput(String(event.target.value));
    if (String(event.target.value).length > 0) {
      dispatch(getSearchSuggestions(String(event.target.value)));
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (searchSuggestions.length > 0) {
          dispatch(clearSearchSuggestions());
        }
      }}
    >
      <div style={{ width: "100%", position: "relative" }}>
        <div
          style={{
            position: "relative",
            zIndex: "2",
          }}
        >
          <div
            onClick={() => getMoviesFromInput()}
            style={{
              position: "absolute",
              right: "20px",
              top: "17px",
              zIndex: "1",
              cursor: "pointer",
            }}
          >
            <MaterialIcon
              icon="search"
              color="white"
              size="medium"
              onClick={() => getMoviesFromInput()}
            />
          </div>
          <SearchField
            id="search"
            fullWidth
            onChange={(event) => onTextInput(event)}
            onKeyDown={keyPress}
            onClick={() => dispatch(getSearchSuggestions(currentTextInput))}
            autoComplete="off"
          />
        </div>
        {currentTextInput.length > 0 && (
          <div
            onMouseLeave={() => setHoverIndex(-1)}
            style={{
              width: "100%",
              maxHeight: "590px",
              backgroundColor: "#0c3653",
              position: "absolute",
              top: "34px",
              borderRadius: "0px 0px 5px 5px",
              display: "flex",
              flexDirection: "column",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
              boxSizing: "border-box",
              zIndex: 1,
            }}
          >
            {searchSuggestions.length > 0 && (
              <div style={{ marginTop: "40px", zIndex: "1" }} />
            )}
            <div style={{ position: "relative", zIndex: "3", top: "-5px" }}>
              {searchSuggestions.map((movie, i) => {
                return (
                  <div
                    onMouseEnter={() => setHoverIndex(i)}
                    onClick={() => {
                      dispatch(getMovieDetails(movie));
                      dispatch(clearSearchSuggestions());
                    }}
                    style={{
                      border:
                        hoverIndex === i
                          ? "1px solid rgb(200,200,200)"
                          : "none",
                      borderTop:
                        (hoverIndex === i - 1 && hoverIndex > 0) || i === 0
                          ? "0px"
                          : hoverIndex === i
                          ? "1px solid rgb(200,200,200)"
                          : "1px solid grey",
                      display: "flex",
                      cursor: "pointer",
                      zIndex: 4,
                      backgroundColor: "#0c3653",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        movie.poster_path
                      }
                      height="75px"
                      style={{ padding: "5px" }}
                      alt={movie.title}
                    />
                    <div
                      style={{
                        padding: "5px",
                        position: "relative",
                        width: "80%",
                      }}
                    >
                      <h4 style={{ margin: 0 }}>{movie.title}</h4>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "7px",
                        }}
                      >
                        <h7>
                          {movie.director.map(
                            (name, i) =>
                              " " +
                              name +
                              (i < movie.director.length - 1 ? "," : "")
                          )}
                        </h7>
                        <br />
                        <br />
                        <h12>
                          {movie.cast.map(
                            (name, i) =>
                              " " +
                              name +
                              (i < movie.cast.length - 1 ? "," : "")
                          )}
                        </h12>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default MovieSearch;
