import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <PrivateRoute path="/" component={BubblePage} />
          <Route path="/login" component={Login} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
