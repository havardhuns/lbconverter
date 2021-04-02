import React from "react";
import lbIcon from "../../static/letterboxd-icon.png";
import MaterialIcon from "material-icons-react";
import Checkbox from "react-simple-checkbox";
import { useSelector, useDispatch } from "react-redux";
import { setChecked } from "../../store/actions/LbDataAction";
import { getMovies } from "../../store/actions/MovieListAction";

const LbFilter = (props) => {
  const lbMovies = useSelector((state) => state.lbMovies.lbMovies);
  const checked = useSelector((state) => state.lbMovies.checked);
  const dispatch = useDispatch();

  const getFrontPageMovies = (check) =>
    dispatch(
      getMovies(1, check, {
        votes: { $gt: 25000 },
      })
    );

  return (
    <div
      style={{
        width: "150px",
        height: "60px",
        borderRadius: "20px",
        border: "5px solid #0c3653",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 10px",
      }}
    >
      <img
        src={lbIcon}
        alt="letterboxdIcon"
        width={"100px"}
        height={"37px"}
        style={{ pointer: "cursor" }}
        onClick={props.onClick}
      />
      {!lbMovies.length > 0 ? (
        <div style={{ marginTop: "3px", cursor: "pointer" }}>
          <MaterialIcon
            icon="note_add"
            color="white"
            size="medium"
            onClick={props.onClick}
          />
        </div>
      ) : (
        <div style={{ padding: "0 10px 6px 0" }}>
          <Checkbox
            checked={checked}
            color="#00e154"
            size="3"
            onChange={(isChecked) => {
              dispatch(setChecked(isChecked));
              getFrontPageMovies(isChecked);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LbFilter;
