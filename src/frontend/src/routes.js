import React from "react";
import { Route } from "react-router-dom";
import Chat from "./containers/Chat";

const BaseRouter = () => (
  <React.Fragment>
    <Route exact path="/:chatID/" component={Chat} />
  </React.Fragment>
);

export default BaseRouter;
