import { Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import FileUploader from "./components/pages/FileUploader";
import React from "react";

const Routes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/uploader" exact component={FileUploader} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
