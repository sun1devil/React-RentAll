import React, { Component } from 'react';

import { withRouter } from "react-router-dom";
import Test from "../components/Test";
import SearchForm  from "../components/SearchForm";


class Search extends Component {

    constructor(){
        super();
        this.state = {
            searchLocation: "",
            searchItem: "",
            reults: [
              {
               
                name:"cat", 
                description: "a cute cuddly cat",
                price: 50, 
                rate: "day", 
                start_date:"08-01-2018", 
                end_date: "08-10-2018", 
                image: "url", 
                active: true, 
                feature: true, 
                UserUUID: "66584723o8jbvdkjs734iukj"}
              ]
         }
         this.pageLoad.bind(this);
         this.captureSearchValues.bind(this);
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

    

    captureSearchValues(data){
        console.log(this)
        this.setState({
            searchLocation: data.address,
            searchItem: data.value
        })
    }
    pageLoad(){
    
        if(this.state.searchLocation === undefined && this.state.searchItem === undefined){
            return(
        <div>
            <h1>NO RESULTS</h1>
            <SearchForm  capture={this.captureSearchValues}/>
        </div>
        
        );
            
        }
        else if(this.state.searchLocation.length > 0 && this.state.searchItem.length> 0){
            return(
                <div>
                    <p>{this.state.searchLocation}</p>
                    <p>{this.state.searchItem}</p>
                    <SearchForm capture={this.captureSearchValues.bind(this)} />
                </div>
            )
        }

    }

    render(){
        console.log(this.state);
        return(
            <div>
            {this.pageLoad()}
            {/* <Items results={this.results} /> */}
            </div>
        )
    }

}

export default withRouter(Search);

/** */