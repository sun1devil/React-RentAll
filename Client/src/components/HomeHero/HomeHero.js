import React from "react";
import "./style.css";

import Banner from "../Banner";
import Search from "../Search";

class HomeHero extends React.Component {

	// send home page search form results to search page
	searchPageResults(item, location){
		// where to go
		// what to send
		this.props.history.push({
		  pathname: '/search',
		  state: {
		    searchLocation: location,
		    searchItem: item
		  }
		});
	}

	render(){
		return(
			<div id="home-hero" className="gradient" align="center">
				<Banner/>
				<div className="heading"><h1>WHY BUY IT WHEN  YOU CAN RENT IT?</h1></div>
				<div className="searchForm">
					<Search searchText={<img src="./assets/img/right-arrow.png"/>} searchPageResults={this.searchPageResults.bind(this)}/>
				</div>
				<div className="waves">
					<img src="./assets/img/waves.png" alt="waves"/>
				</div>
			</div>
		);
	}
}


export default HomeHero;
