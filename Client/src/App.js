// import React, { Component } from 'react';
// import logo from './logo.svg';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import './App.css';



const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/about" component={About} />

        <Route exact path="/account" component={Account} />

        <Route exact path="/search" component={Search} />

        <Route component={NoMatch} />

      </Switch>
    </div>
  </Router>
);


export default App;
  