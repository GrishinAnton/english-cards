//@ts-ignore
import React from "react";
import { Router, Switch, Route } from "react-router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import history from "./utils/browserHistory";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
