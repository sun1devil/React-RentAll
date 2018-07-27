import React from "react";
import "./style.css";

import { Grid, Row, Col, Tab, NavItem, Nav } from 'react-bootstrap';

import Dashboard from "../Dashboard";

class AccountContent extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="account-content gradient">

			<Tab.Container id="left-tabs-example" defaultActiveKey="first">
			<Grid >
			  <Row className="clearfix">
			    <Col sm={4} >
			      <Nav bsStyle="pills" stacked >
			        <NavItem eventKey="first" className="light-btn">PROFILE</NavItem>
			        <NavItem eventKey="second" className="light-btn">DASHBOARD</NavItem>
			      </Nav>
			    </Col>
			    <Col sm={8}>
			      <Tab.Content animation>

	    			<Tab.Pane eventKey="first">
	    				{this.props.renderAccountProfile()}
			        </Tab.Pane>
			         <Tab.Pane eventKey="second">
			        	<Dashboard/>
			        </Tab.Pane>
			      </Tab.Content>
			    </Col>
			  </Row>
			  </Grid>
			</Tab.Container>
			</div>
		)
	}
}

export default AccountContent;
