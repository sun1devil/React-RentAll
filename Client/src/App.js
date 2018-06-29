// import React, { Component } from 'react';
// import logo from './logo.svg';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import AccountPage from "./pages/AccountPage";
import Home from "./pages/Home";
import Search from "./pages/Search";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Nav/>
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/about" component={About} />
        <Route exact path="accountpage" component= {AccountPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="search" component={Search} />
      </Switch>
    </div>
  </Router>
);



// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
