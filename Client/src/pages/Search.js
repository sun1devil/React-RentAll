import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Test from "../components/Test";

import Items from "../components/Items";

class Search extends Component {

    constructor(){
        super();
        this.state = {
            searchLocation: "",
            searchItem: "",
            results: [
                {
                    uuid: "sdfghjk4567890cfgvhbjn",
                    name:"cat", 
                    description: "a cute cuddly cat",
                    price: 50, 
                    rate: "day", 
                    start_date:"08-01-2018", 
                    end_date: "08-10-2018", 
                    image: "url", 
                    active: true, 
                    feature: true, 
                    userUUID: "66584723o8jbvdkjs734iukj"
                },
                {
                    uuid: "456789fdghjbnhy76rtdfgcv",
                    name:"phone", 
                    description: "a cute cuddly phone",
                    price: 10, 
                    rate: "day", 
                    start_date:"08-01-2018", 
                    end_date: "09-10-2018", 
                    image: "url", 
                    active: true, 
                    feature: false, 
                    userUUID: "456789dfhjnkml67tygjbhuyge"
                },
                {
                    uuid: "38473874hehfhdkfhhfhfhfkl",
                    name:"bike", 
                    description: "mountain bike",
                    price: 25, 
                    rate: "day", 
                    start_date:"07-01-2018", 
                    end_date: "12-31-2018", 
                    image: "url", 
                    active: true, 
                    feature: false, 
                    userUUID: "438jfkejfadkjfgvuidgffhks"
                }
              ]
         }
        //  this.pageLoad.bind(this);
    }

    componentWillMount() {
        console.log(this.props)
        if(this.props.location.state){
          console.log("&&&&&&",this.state)
            this.setState({
                searchLocation: this.props.location.state.searchLocation,
                searchItem: this.props.location.state.searchItem
            })
        }
      }

      pageLoad(){
      
          if(this.state.searchLocation === undefined && this.state.searchItem === undefined){
              return(<h1>NO RESULTS</h1>);
          }
          else if(this.state.searchLocation.length > 0 && this.state.searchItem.length> 0){
              return(
                  <div>
                      <p>{this.state.searchLocation}</p>
                      <p>{this.state.searchItem}</p>

                      <Items results={this.state.results} />
                  </div>
              )
          }

      }

    render(){
        console.log(this.state);
        return(
            <div>
            {this.pageLoad()}
           
            </div>
        )
    }

}

export default withRouter(Search);