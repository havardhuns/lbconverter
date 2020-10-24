import React, { Component } from "react";
import { connect } from "react-redux";
import { getTorrents, setTorrent } from "../actions/rarbgAction";
import MaterialIcon from "material-icons-react";

class TorrentList extends Component {
  constructor(props) {
    super(props);
    this.state = { torrent: "null" };
  }

  componentDidMount() {
    this.props.getTorrents(this.props.imdbId);
  }

  getRes = title => {
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

  getSize = size => {
    if (size > 1073741824) {
      return (size / 1073741824).toFixed(2) + " GB";
    } else {
      return (size / 1048576).toFixed(2) + " MB";
    }
  };

  render() {
    console.log(this.props.torrentList)
    return (
      this.props.torrentList.length > 0 && (
        <div>
          <h4>Torrents:</h4>
          {this.props.torrentList.map(torrent => (
            <div>
              {"Seeders: " +
                torrent.seeders +
                " - " +
                this.getRes(torrent.title) +
                " - " +
                this.getSize(torrent.size)}{" "}
              <MaterialIcon
                icon="play_circle_outline"
                color="white"
                size="small"
                onClick={() => window.open(torrent.download, "_blank")}
              />
            </div>
          ))}
        </div>
      )
    ); //this.props.torrentList.length > 0 && <div> {this.props.torrentList[0].} </div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTorrents: imdbId => dispatch(getTorrents(imdbId)),
    setTorrent: torrent => dispatch(setTorrent(torrent))
  };
};

const mapStateToProps = state => ({
  torrentList: state.torrentList.torrentList
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TorrentList);

//tt0816692
