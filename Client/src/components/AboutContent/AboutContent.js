import React from "react";

import "./style.css";

import { Grid, Row, Col, Carousel} from 'react-bootstrap';

import HomeContent from "../HomeContent"

class AboutContent extends React.Component {
	render(){
		return(
			<div id="about-content" className="gradient">
				<div className="about-section"></div>
			 	<HomeContent/>
			</div>
		);
	}
}


export default AboutContent;
