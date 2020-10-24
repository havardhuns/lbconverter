import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles, fade } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MaterialIcon from "material-icons-react";

const SearchField = withStyles(theme => ({
  input: {
    borderRadius: 40,
    border: "1px solid rgba(255,255,255,0.1)",

    backgroundColor: "#0c3653",
    color: "white",
    fontSize: 25,
    margin: "0",
    outline: "none"
  },
  notchedOutline: {
    border: "none",
    outline: "none"
  }
}))(OutlinedInput);

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTextInput: "", hoverIndex: -1 };
  }
  search = () => {
    this.props.clearSearchSuggestions();
    if (this.state.currentTextInput !== "") {
      this.props.search(this.state.currentTextInput);
    } else {
      this.props.getMovies()
    }
  };

  clickedMovie = movie => {
    this.props.onClick(movie);
  };

  keyPress = e => {
    if (e.keyCode == 13) {
      this.search();
      // put the login here
    }
  };

  onTextInput = event => {
    this.setState({ currentTextInput: String(event.target.value) });
    if (String(event.target.value).length > 0) {
      this.props.getSearchSuggestions(String(event.target.value));
    }
    console.log();
  };

  render() {
    console.log(this.props.searchSuggestions.length);
    var searchSuggestions = this.props.searchSuggestions;
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%"
          }}
        >
          <div
            style={{
              width: "50%",
              zIndex: "2",
              position: "relative"
            }}
          >
            <div
              onClick={() => this.search()}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                zIndex: "1",
                cursor: "pointer",
              }}
            >
              <MaterialIcon
                icon="search"
                color="white"
                size="medium"
                onClick={() => this.search}
              />
            </div>
            <SearchField
              id="search"
              fullWidth
              onChange={event => this.onTextInput(event)}
              onKeyDown={this.keyPress}
              onClick={() =>
                this.props.getSearchSuggestions(this.state.currentTextInput)
              }
            />
          </div>
        </div>
        {this.state.currentTextInput.length > 0 && (
          <div
            onMouseLeave={() => this.setState({ hoverIndex: -1 })}
            style={{
              width: "calc(50% - 2px)",
              maxHeight: "537px",
              backgroundColor: "#0c3653",
              position: "absolute",
              left: "25%",
              top: "49px",
              borderRadius: "0px 0px 5px 5px",
              display: "flex",
              flexDirection: "column",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {searchSuggestions.length > 0 && (
              <div style={{ marginTop: "40px", zIndex: "1" }} />
            )}
            <div style={{ position: "relative", zIndex: "3", top: "-5px" }}>
              {searchSuggestions.map((movie, i) => {
                return (
                  <div
                    onMouseEnter={() => this.setState({ hoverIndex: i })}
                    onClick={() => {
                      this.props.openMovie(movie);
                      this.props.clearSearchSuggestions();
                    }}
                    style={{
                      border:
                        this.state.hoverIndex === i
                          ? "1px solid rgb(200,200,200)"
                          : "none",
                      borderTop:
                        (this.state.hoverIndex === i - 1 &&
                          this.state.hoverIndex > 0) ||
                        i === 0
                          ? "0px"
                          : this.state.hoverIndex === i
                          ? "1px solid rgb(200,200,200)"
                          : "1px solid grey",
                      display: "flex",
                      cursor: "pointer",
                      zIndex: 4,
                      backgroundColor: "#0c3653",
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
                    <div style={{ padding: "5px", position: "relative", width: "80%"}}>
                      <h4 style={{ margin: 0 }}>{movie.title}</h4>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "7px"
                        }}
                      >
                        <h7>{movie.director.map((name, i) => " " + name + (i < movie.director.length -1 ? ",": ""))}</h7>
                        <br />
                        <br/>
                        <h12>{movie.cast.map((name, i) => " " + name + (i < movie.cast.length -1 ? ",": ""))}</h12>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MovieList;
