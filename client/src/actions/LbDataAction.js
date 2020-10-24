export const setMovies = lbMovies => ({
    type: "GET_LB_MOVIES",
    lbMovies: lbMovies
  });
  
  
  export function getLbMovies() {
    return dispatch => {
      fetch("http://localhost:5000/lbmovies")
        .then(response => response.json(), error => console.log(error))
        .then(lbMovies => {
          dispatch(setMovies(lbMovies));
        });
    };
}

    export function deleteLbData() {
        return dispatch => {
            fetch("http://localhost:5000/clearlb", {method: "POST"})
              .then(response => response.json(), error => console.log(error))
              .then(
                dispatch(setMovies([]))
              );
          };
    }
  
  
  