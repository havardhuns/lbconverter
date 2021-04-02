import React, { useEffect, useState } from "react";
import { getTorrents } from "../../store/actions/torrentAction";
import MaterialIcon from "material-icons-react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const TorrentList = (props) => {
  const torrent = useSelector((state) => state.torrentList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTorrents(props.imdbId));
  }, []);

  const getRes = (title) => {
    let dot = 0;
    for (var i = 0; i < title.length - 1; i++) {
      if (title[i] === ".") {
        dot = i;
      }
      if (title[i] === "0" && title[i + 1] === "p") {
        return title.substr(dot + 1, i + 1 - dot);
      }
    }
  };

  return (
    <div>
      <h4>Torrents:</h4>
      {torrent.loading ? (
        <CircularProgress />
      ) : (
        torrent.torrentList.map((torrent) => (
          <div>
            {"Seeders: " +
              torrent.seeders +
              " - " +
              getRes(torrent.filename) +
              " - " +
              torrent.size}{" "}
            <MaterialIcon
              icon="play_circle_outline"
              color="white"
              size="small"
              onClick={() => window.open(torrent.download, "_blank")}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TorrentList;
