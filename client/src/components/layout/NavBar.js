import MovieSearch from "./MovieSearch";
import LbFilter from "./LbFilter";
import Logo from "./Logo";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  let history = useHistory();

  const redirect = (path) => {
    if (history.location.pathname === path) {
      history.go(0);
    } else {
      history.push(path);
    }
  };

  return (
    <div style={style.navbar}>
      <div style={style.logo}>
        <Logo
          onClick={() => {
            redirect("/");
          }}
        />
      </div>
      <div style={style.searchBar}>
        <MovieSearch />
      </div>
      <div style={style.lb}>
        <LbFilter onClick={() => redirect("/uploader")} />
      </div>
    </div>
  );
};

const style = {
  navbar: {
    width: "80%",
    height: "100px",
    display: "flex",
    alignItems: "center",
    margin: "0 10%",
  },
  logo: {
    flex: "1 1 0px",
    justifyContent: "flex-start",
  },
  searchBar: {
    flex: "2 1 0px",
  },
  lb: {
    flex: "1 1 0px",
    alignSelf: "center",
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default NavBar;
