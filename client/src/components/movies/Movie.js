const Movie = (props) => {
  return (
    <div
      style={{
        width: "90px",
        height: "135px",
        backgroundColor: "#0e273e",
      }}
    >
      <img
        src={"https://image.tmdb.org/t/p/original/" + props.movie.poster_path}
        width="90px"
        height="135px"
        style={{
          border: "1px solid rgb(150,150,150)",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        alt={props.movie.title}
        onClick={props.onClick}
      />
    </div>
  );
};

export default Movie;
