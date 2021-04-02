export const setMovies = (lbMovies) => ({
  type: "GET_LB_MOVIES",
  lbMovies: lbMovies,
});

export const setChecked = (value) => ({
  type: "SET_CHECKED",
  payload: value,
});

export function getLbMovies() {
  return (dispatch) => {
    fetch("/api/lbmovies")
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((lbMovies) => {
        dispatch(setMovies(lbMovies));
      });
  };
}

export function upload(file) {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((res) => {
        getLbMovies();
        console.log(res.data);
      });
  };
}

export function deleteLbData() {
  return (dispatch) => {
    fetch("/api/clearlb", { method: "POST" })
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then(dispatch(setMovies([])));
  };
}
