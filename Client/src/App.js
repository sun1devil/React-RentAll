import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// helper functions
import API from "./utils/API";

// pages
import About from "./pages/About";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";


// components
import Navigation from "./components/Navigation"

import './App.css';


/*
HIGH LEVEL
- set an initial state with a key of isLoggedIn in this value will always be a boolean and to start is false

- create a function that calls on the API helper function for checking authentication
  the return of this call will set the state of isLoggedIn to the response.data

- when the components mounts call the function declared above

- inside the render write a conditional
  - if the user is logged in the user can be routed to account
  - else if they try to go to account and are not logged in the home component should

- create a function that updates the url to / if a user is notlogged in and trys to go to account

*/




// create a class called App
// extend component so that we are able to use react logic
/*
  here is some info on React.Component https://toddmotto.com/react-create-class-versus-component
    &
  https://reactjs.org/docs/components-and-props.html
*/
class App extends React.Component {
  // create state
  // create a key of isLoggedIn and its initial value to false
    /* (this is for validation if a user is logged in or not and we will use this for rendering component logic)*/
  state = {
    isLoggedIn: false
  }

  // call on the componentWillMount react function
    /*
      This function is called right before the component’s first render,
      so at first glance it appears to be a perfect place to put data fetching logic
      here is a link with more info https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
    */
  // inside the componentWillMount function we will invoke a function that will be written below (isAuthenicated)
  componentWillMount(){
    this.isAuthenicated();
  }

  // create a function with the same name as the API help we are using
  // which is isAuthenicated
  // inside this function call on the API helper
    // API.isAuthenicated()
  // inside the API file the function is doing an axios call to the server to check if the user is authenticatd
  // the server will return a true or false value to the function which called it.
  // the helper funtion is set up to return the value to where is was called
  // use .then to access the value which comes back as an Obj with a few values but we only need the response data (response.data)
    // inside the .then console.log the respose to make sure you arae gettign what you think you are getting.
    // set the state isLoggedIn to the response data
  // dont forget to add a catch for any errors and console log the error
  isAuthenicated(){
    API.isAuthenicated()
    .then(data => {return data.json()})
    .then(jsonObj=>{
      console.log("isLoggedIn:",jsonObj);
      this.setState({
        isLoggedIn: jsonObj
      });

    })
    .catch(err=> console.log("err",err));
  }

  // create a function that will update the browser url to "/" when the href is equal to "/account"
  // update only when user is not logged in
  updatePath(){
    if(window.location.pathname === "/account"){
      window.location.replace("http://localhost:3000");
    }
  }

  // create a react render function
  // inside the render function write a conditional
  // the conditional should check the state isLoggedIn
  // if isLoggedIn value is true the user can access any route
    // return router with a switch to any route and all compontents
  // else the user should not be able to access account page
    // return router with a switch to all routes and all components except account
    // if the route is /account render home components and call on isAuthenicated and invoke it in this route
  render(){

    if(this.state.isLoggedIn){
      return(
          <Router>
          <div>
            <Navigation isLoggedIn={this.state.isLoggedIn} isAuthenicated={this.isAuthenicated.bind(this)}/>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route exact path="/home" component={Home} />

              <Route exact path="/about" component={About} />

              <Route exact path="/account" component={Account} isLoggedIn={this.state.isLoggedIn} />

              <Route exact path="/search" component={Search} />

              <Route component={NoMatch} />

            </Switch>
          </div>
        </Router>
      )
    }
    else {
      return(
        <Router>
          <div>
            <Navigation isLoggedIn={this.state.isLoggedIn} isAuthenicated={this.isAuthenicated.bind(this)}/>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route exact path="/home" component={Home} />

              <Route exact path="/about" component={About} />

              <Route exact path="/search" component={Search} />

              <Route exact path="/account" component={Home} />

              <Route component={NoMatch} />

            </Switch>
          </div>
        </Router>
      )
    }
  }

};


export default App;



/*
  be able update path when a user is not logged
  in and home is render the url path should be /
  and any other route text should be removed
*/



