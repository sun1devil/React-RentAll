import React from "react";

import ReactDOM from "react-dom";

import Popup from '../Popup';

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
	state = {
		modalShow: false
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
			// alert("please fill out form")
			this.setState({
				modalShow: true
			})
		}

	}

	renderModalContent(){
		return(
			<div>
				<h2>Whoops!</h2>
				<h5 className="error">Please input at least one value when searching.</h5>
				<img src="./assets/img/search.png" alt="search"/>
				<p>Search by location, category or both!</p>
			</div>
		)
	}

	handleClose() {
   		this.setState({ modalShow: false });
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

				 <Popup modalShow={this.state.modalShow} handleClose={this.handleClose.bind(this)}>
					{this.renderModalContent()}
				</ Popup>
			</div>
		);
	}
}


export default withRouter(HomeHero);
