import Modal from "@material-ui/core/Modal";
import TorrentList from "./TorrentList.js";

const MovieDetails = (props) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Modal
        open={props.movie}
        onBackdropClick={props.close}
        onEscapeKeyDown={props.close}
      >
        <div style={style.modal}>
          <div>
            <img
              src={
                "https://image.tmdb.org/t/p/original/" +
                props.movie.backdrop_path
              }
              style={style.backDrop}
              alt="backdrop"
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "75%",
                height: "80%",
                backgroundColor: "rgba(0,0,0,0.5)",
                fontFamily: "roboto",
                display: "flex",
              }}
            >
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  props.movie.poster_path
                }
                alt="poster"
                style={{ height: "100%", width: "auto" }}
              />
              <div style={{ overflow: "scroll", padding: "5px" }}>
                <h1>{props.movie.title}</h1>
                <h3>
                  {props.movie.release_date.substring(0, 4)} Directed by
                  {props.movie.director.map(
                    (name, i) =>
                      " " +
                      name +
                      (i < props.movie.director.length - 1 ? "," : "")
                  )}
                </h3>
                <h3 style={{ color: "white" }}>{props.movie.tagline}</h3>
                <h3>{props.movie.overview}</h3>
                <TorrentList imdbId={props.movie.imdb_id} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const style = {
  modal: {
    position: "absolute",
    width: "80%",
    height: "auto",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    backgroundColor: "rgb(50,50,50)",
  },
  backDrop: {
    width: "100%",
    opacity: "0.5",
    filter: "blur(4px)",
  },
};

export default MovieDetails;
