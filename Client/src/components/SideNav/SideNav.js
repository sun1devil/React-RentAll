import React from "react";
import "./style.css";

import Search from "../Search";

class SideNav extends React.Component{
	// constuctor(props){
	// 	super(props)
	// 	//this.props.handleSideNavSearch = this.props.handleSideNavSearch.bind(this)
	// }

	searchPageResults(searchLocation, searchItem, categoryID){
		// console.log(searchLocation, searchItem)
		this.props.handleSideNavSearch(searchLocation, searchItem, categoryID)
	}

	render(){
		return(
			<div id="side-nav">
				<Search searchPageResults={this.searchPageResults.bind(this)} searchText="search" styling="light-btn"/>
			</div>
		)
	}
}

export default SideNav;
