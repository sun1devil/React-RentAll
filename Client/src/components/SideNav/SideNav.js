import React from "react";
import "./style.css";

import Search from "../Search";

class SideNav extends React.Component{
	// constuctor(props){
	// 	super(props)
	// 	//this.props.handleSideNavSearch = this.props.handleSideNavSearch.bind(this)
	// }

	searchPageResults(searchLocation, searchItem){
		console.log(searchLocation, searchItem)
		this.props.handleSideNavSearch(searchLocation, searchItem)
	}

	render(){
		return(
			<div>
				<Search searchPageResults={this.searchPageResults.bind(this)} searchText="search" />
			</div>
		)
	}
}

export default SideNav;
