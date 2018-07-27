import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Items from "../components/Items";
import SideNav from "../components/SideNav";

// helper functions
import API from "../utils/API";

import { Grid, Row, Col } from 'react-bootstrap';

class Search extends Component {
  constructor(props){
    super(props)
     this.state = {
      searchLocation: "",
      searchItem: "",
      categoryID: "",
      results:[]
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
      console.log(jsonObj);

        this.setState({
          results: jsonObj
        })

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
        <Grid fluid={true}>
        <Row>
        <Col xs={12} sm={12} md={3}>
          <SideNav handleSideNavSearch={this.handleSideNavSearch.bind(this)}/>
        </Col>
        <Col xs={12} sm={12} md={9}>
          <div className="search-content">{this.searchContent()}</div>
        </Col>
        </Row>
        </Grid>
        </div>
    )
  }

}

export default withRouter(Search);
