import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Test from "../components/Test";


class Search extends Component {

    constructor(){
        super();
        this.state = {
            searchLocation: "",
            searchItem: "",
            // reults: [
            //   {
            //     name:"cat",
            //     description: "a cute cuddly cat",
            //     price: 50,
            //     rate: "day",
            //     start_date:"08-01-2018",
            //     end_date: "08-10-2018",
            //     image: "url",
            //     active: true,
            //     feature: true,
            //     UserUUID: "66584723o8jbvdkjs734iukj"}
            //   ]
         }
        //  this.pageLoad.bind(this);
    }

    componentWillMount() {
        console.log(this.props)
        if(this.props.location.state){
          // console.log("&&&&&&",this.state)
            this.setState({
                searchLocation: this.props.location.state.searchLocation,
                searchItem: this.props.location.state.searchItem
            })
            // API.searchItems()
            // .then(results)
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
