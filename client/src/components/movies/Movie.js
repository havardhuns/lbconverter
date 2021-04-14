import { useState } from "react";

const Movie = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        width: "94px",
        height: "140px",
        backgroundColor: "#0e273e",
        border: hover ? "1px solid white" : "1px solid rgb(150,150,150)",
        transition: "border 0.2s",
        borderRadius: "5px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={"https://image.tmdb.org/t/p/original/" + props.movie.poster_path}
        width="94px"
        height="140px"
        style={{
          borderRadius: "4px",
          cursor: "pointer",
        }}
        alt={props.movie.title}
        onClick={props.onClick}
      />
    </div>
  );
};

export default Movie;
