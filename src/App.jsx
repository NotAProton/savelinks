import { useState } from "react";
import { Link, Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import "./App.css";
import saved from "./saved/main.jsx";
import popup from "./popup/main.jsx";

function App() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/popup" component={popup} />
        <Route path="/saved" component={saved} />
        <Route>404: No such page!</Route>
      </Switch>
    </Router>
  );
}

export default App;
