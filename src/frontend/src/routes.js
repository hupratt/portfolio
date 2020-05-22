import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Chat from "./containers/Chat";

const BaseRouter = () => (
  <Hoc>
    {/* <Route path=':chatID/' render={(props) => <Chat {...props} match={this.handleMatch}/>}/> */}
    {/* <Route path='/chat/:chatID/' render={(props) => <Chat {...matchProps} {...this.props} handleMatch={this.handleMatch}/>}/> */}
    <Route exact path="/:chatID/" component={Chat} />
  </Hoc>
);

export default BaseRouter;
