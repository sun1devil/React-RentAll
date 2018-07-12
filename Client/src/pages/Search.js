import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Items from "../components/Items";
import SideNav from "../components/SideNav";

// helper functions
import API from "../utils/API";


class Search extends Component {
  constructor(props){
    super(props)
     this.state = {
      searchLocation: "",
      searchItem: "",
      categoryID: "",
      results: [
        {
          category:"pet",
          description: "a cute cuddly cat",
          price: 50,
          image: "cat",
          feature: true,
          UUID: "66584723o8jbvdkjs734iukj",
          availability:  ["2018/07/11", "2018/07/12", "2018/07/13", "2018/07/14", "2018/07/15", "2018/07/16"],
          disabled:[new Date(2018,7,11)]
        },
        {
          category:"pet",
          description: "a cute cuddly kitten",
          price: 40,
          image: "cat1",
          feature: true,
          UUID: "45678iuygfcdvbnmghjukjhgftyh",
          availability:  ["2018/07/17", "2018/07/18", "2018/07/19", "2018/07/20", "2018/07/21", "2018/07/22"],
          disabled:[]
        }
      ]
    }
  }

  //for server side code
  componentWillMount() {
    if(this.props.location.state){

      const searchLocation = this.parseLocation(this.props.location.state.searchLocation);
      this.getItems([this.props.location.state.categoryUUID, this.props.location.state.searchLocation])

        this.setState({
            searchLocation: this.props.location.state.searchLocation,
            searchItem: this.props.location.state.searchItem,
            categoryID: this.props.location.state.categoryUUID
        })
    }
  }

  parseLocation(location){
    let parsedLocation = location
    if(location.length>0){
      parsedLocation = parsedLocation.replace(/\s+/g, '%');
    }
    return(parsedLocation)
  }

  getItems(data){
    console.log("data", data)
    API.getItems(data)
    .then(data => {return data.json()})
    .then(jsonObj=>{
      console.log("db items", jsonObj)
      if(jsonObj.isArray){
        this.setState({
          results: jsonObj
        })
      }
      alert("Oh no something went wrong! Try searching again.")

    })
     .catch(err=> console.log("err",err));
  }

  // what to render on the page for items
  searchContent(){
    if(this.state.results.length === 0){
        return(<h1>NO RESULTS</h1>);
    }
    else{
        return(
           <Items results={this.state.results} />
        )
    }
  }

  // callback for side nav to update state the user input from the search component
  handleSideNavSearch(searchLocation, searchItem, categoryUUID){
    // update state with side nav search results
    // set state to the search inputs from side nav search
     this.setState({
        searchLocation: searchLocation,
        searchItem: searchItem,
        categoryID: categoryUUID
    })
     const thisComponent = this;
     setTimeout(function(){
          thisComponent.getItems([thisComponent.state.categoryID, thisComponent.state.searchLocation])
      }, 400);

  }

  render(){

    return(
        <div id="search" className="gradient">
          <SideNav handleSideNavSearch={this.handleSideNavSearch.bind(this)}/>
          <div className="search-content" align="center">{this.searchContent()}</div>
        </div>
    )
  }

}

export default withRouter(Search);
