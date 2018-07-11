import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

// import Items from "../components/Items";
import SideNav from "../components/SideNav";

class Search extends Component {
  constructor(props){
    super(props)
     this.state = {
      searchLocation: "",
      searchItem: "",
      reults: [
        {
          category:"pet",
          description: "a cute cuddly cat",
          price: 50,
          rate: "day",
          image: "./assets/uploads/cat.png",
          feature: true,
          UUID: "66584723o8jbvdkjs734iukj",
          availability: ["08/01/2018", "09/01/2018", "10/01/2018", "11/01/2018"]
        },
        {
          category:"pet",
          description: "a cute cuddly kitten",
          price: 40,
          rate: "day",
          image: "./assets/uploads/kitten.png",
          feature: true,
          UUID: "45678iuygfcdvbnmghjukjhgftyh",
          availability: ["08/01/2018", "09/01/2018", "10/01/2018", "11/01/2018"]
        },
        {
          category:"pet",
          description: "a cute cuddly dog",
          price: 50,
          rate: "month",
          image: "./assets/uploads/dog.png",
          feature: false,
          UUID: "66584723o8jbcvbnmbviukj",
          availability: ["08/01/2018", "09/01/2018", "10/01/2018", "11/01/2018"]
        },
        {
          category:"tools",
          description: "a cute cuddly mower",
          price: 25,
          rate: "day",
          image: "./assets/uploads/mower.png",
          feature: false,
          UUID: "66584723o8jbvfghjhgiukj",
          availability: ["08/01/2018", "09/01/2018", "10/01/2018", "11/01/2018"]
        },
        {
          category:"appliance",
          description: "a cute cuddly fridge",
          price: 65,
          rate: "month",
          image: "./assets/uploads/fridge.png",
          feature: true,
          UUID: "66584723o8jbvdkjs73edfgtyhujkjnb",
          availability: ["07/01/2018", "07/11/2018", "10/11/2018", "11/11/2018"]
        }
      ]
    }
  }


  //for server side code
  componentWillMount() {
      console.log(this.props)
      if(this.props.location.state){
        // console.log("&&&&&&",this.state)
          this.setState({
              searchLocation: this.props.location.state.searchLocation,
              searchItem: this.props.location.state.searchItem
          })
      }
  }

  // what to render on the page for items
  searchContent(){
    if(this.state.results.length === 0){
        return(<h1>NO RESULTS</h1>);
    }
    // else{
    //     return(
    //        <Items results={this.state.results} />
    //     )
    // }
  }

  // callback for side nav to update state the user input from the search component
  handleSideNavSearch(searchLocation, searchItem){
    // update state with side nav search results
    console.log("side nav search", searchLocation, searchItem);
    // set state to the search inputs from side nav search
     this.setState({
        searchLocation: searchLocation,
        searchItem: searchItem
    })
      // this.getItems(date)
  }


    // SERVER SIDE REQUEST
    // getItems(data){
    //   API.getItems()
    //   .then(data => {return data.json()})
    //   .then(jsonObj=>{
    //     console.log("results", jsonObj)
    //       // check if there are results
    //       //if there are results
    //       this.setState({
    //         results: jsonObj
    //       })

    //   })
    //    .catch(err=> console.log("err",err));
    // }

    render(){
        console.log(this.state);
        return(
            <div>
              <SideNav handleSideNavSearch={this.handleSideNavSearch.bind(this)}/>
              {this.searchContent()}
            </div>
        )
    }

}

export default withRouter(Search);
