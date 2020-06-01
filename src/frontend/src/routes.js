import React from "react";
import { Route, Switch } from "react-router-dom";
import Chat from "./containers/Chat";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/chat/:chatID/" component={Chat} />
  </Switch>
);

export default BaseRouter;
