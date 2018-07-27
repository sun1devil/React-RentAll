import React from "react";

import "./style.css";

import { Grid, Row, Col, Carousel} from 'react-bootstrap';

class HomeContent extends React.Component {
	render(){

		return(
			<div id="home-content">
				<section id="how-it-works">
					<Grid align="center">
						<Row>
							<Col xs={12} md={12} >
								<h3>RENT IT WHEN YOU NEED IT – RENT IT WHEN YOU DONT.</h3>
							</Col>
						</Row>
						<Row className="hiw-text" align="center">
							<Col xs={12} sm={12} md={4}>
								<img src="./assets/img/search.png" alt="search"/>
								<div className="home-txt home-txt-first">
									<h4>Some title</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nisl at nulla dictum pretium in ac nibh.</p>
								</div>
							</Col>
							<Col xs={12} sm={12} md={4}>
								<img src="./assets/img/checklist.png" alt="rent"/>
								<div className="home-txt">
									<h4>Some title</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nisl at nulla dictum pretium in ac nibh.</p>
								</div>
							</Col>
							<Col xs={12} sm={12} md={4}>
								<img src="./assets/img/money.png" alt="pay"/>
								<div className="home-txt home-txt-last">
									<h4>Some title</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nisl at nulla dictum pretium in ac nibh.</p>
								</div>
							</Col>
						</Row>
						<Row>
							<Col xs={12} md={12}>
								<a href="/about">learn more</a>
							</Col>
						</Row>
					</Grid>
				</section>
				<section id="about-us">
					<Grid fluid={true}>
						<Row>
							<Col xs={12} sm={12} md={3} className="bk-green about-left clearfix">
								<img src="./assets/img/r-2.png" alt="rent all"/>
							</Col>
							<Col xs={12} sm={12} md={10} className="bk-green about-right clearfix">
								<h4>Lorem ipsum dolor sit amet, consectetur adipiscing
								Donec vitae nisl at nulla dictum pretium in ac nibh.</h4>
								<p>Etiam vel erat tincidunt, aliquet mi vulputate, pellentesque nibh.
								Suspendisse nec placerat elit, a vestibulum lacus. Curabitur vitae
								rhoncus mauris, ut aliquet ex. Donec sed blandit elit, hendrerit sodales
								dolor. Donec laoreet lacus ut massa dignissim vehicula.</p>
							</Col>
						</Row>
					</Grid>
				</section>
				<section id="reviews">
					<Grid align="center">
						<Col xs={12} sm={12} md={6}>
							<h3>What OUR Customers Are Saying:</h3>
						</Col>
						<Col xs={12} sm={12} md={6}>
							<div className="slide-wrap">
								<img src="./assets/img/chat.png" alt="speech bubble"/>
								<Carousel controls={false}>
								  <Carousel.Item>

								      <h3>This app is fire!</h3>
								      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
								      <br/>
								      <p>Jane Doe.</p>
								  </Carousel.Item>
								  <Carousel.Item>
								  		<h3>I LOVE RENTING</h3>
								      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
								      <br/>
								      <p>John Doe.</p>
								  </Carousel.Item>
								  <Carousel.Item>
								     <h3>Made extra cash</h3>
								      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
								      <br/>
								      <p>Jim Doe.</p>
								  </Carousel.Item>
								</Carousel>
							</div>
						</Col>
					</Grid>
				</section>
			</div>
		);
	}
}


export default HomeContent;
