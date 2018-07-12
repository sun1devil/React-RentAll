import React from "react";

import ReactDOM from "react-dom";

// import { BrowserRouter as Router } from "react-router-dom";

import {withRouter} from "react-router-dom";

import "./style.css";

import { createHashHistory } from 'history'


import Banner from "../Banner";
import Search from "../Search";

class HomeHero extends React.Component {
	constructor(props){
		super(props)

		this.searchPageResults = this.searchPageResults.bind(this);
	}

	// send home page search form results to search page
	searchPageResults(item, location, categoryID){
		// where to go
		// what to send

		if(item.length>0 || location.length>0){

			this.props.history.push({
			  pathname: '/search',
			  state: {
			    searchLocation: location,
			    searchItem: item,
			    categoryUUID: categoryID
			  }
			});
		}else {
			alert("please fill out form")
		}

	}

	render(){
		return(
			<div id="home-hero" className="gradient" align="center">
				<Banner/>
				<div className="heading"><h1>WHY BUY IT WHEN  YOU CAN RENT IT?</h1></div>
				<div className="searchForm">
					<Search searchText={<img src="./assets/img/right-arrow.png"/>} searchPageResults={this.searchPageResults.bind(this)} styling="round"/>
				</div>
				<div className="waves">
					<img src="./assets/img/waves.png" alt="waves"/>
				</div>
			</div>
		);
	}
}


export default withRouter(HomeHero);
