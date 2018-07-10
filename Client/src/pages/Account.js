import React, { Component } from 'react';
// import React from "react";

import ProfileForm from "../components/ProfileForm";

import { Tab, Row, Col, NavItem, Nav } from 'react-bootstrap';

import API from "../utils/API";

class Account extends React.Component {

	// initial state of profile
	state = {
		firstName: "",
		lastName: "",
		street: "",
		city: "",
		state: "",
		zip: 0,
		phone: 0,
		hasData: false
	}


	// before first render get all the users account info
	componentWillMount(){
		this.getUserAccount()
		// console.log(this.props)
	}


	// update state with user account info
	getUserAccount(){
		API.getUserAccount()
		.then(data => {return data.json()})
		.then(jsonObj => {
			// if there is account data
			if(Object.keys(jsonObj).length > 0){
				console.log("has keys")
				this.setState({
					firstName: jsonObj.first_name,
					lastName: jsonObj.last_name,
					street: jsonObj.street,
					city: jsonObj.city,
					state: jsonObj.state,
					zip: jsonObj.zip,
					phone: jsonObj.phone,
					hasData: true
				});
			}

		})
	  	.catch(err => console.log("err",err));
	}


	// conditional rendering
	// if there is user account data
	// display the data
	// else show a for to add data
	renderAccountProfile(){
		if(this.state.hasData){
			return(
				<div>
					<p>{this.state.firstName} </p>
				</div>
			);
		}else if(!this.state.hasData){
			return(<ProfileForm />)
		}
	}

	render(){
		return(
			 <div>
			    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
				  <Row className="clearfix">
				    <Col sm={4}>
				      <Nav bsStyle="pills" stacked>
				        <NavItem eventKey="first">Tab 1</NavItem>
				        <NavItem eventKey="second">Tab 2</NavItem>
				      </Nav>
				    </Col>
				    <Col sm={8}>
				      <Tab.Content animation>
				        <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
	        				<Tab.Pane eventKey="second">
	        				{this.renderAccountProfile()}
				        </Tab.Pane>
				      </Tab.Content>
				    </Col>
				  </Row>
				</Tab.Container>
			</div>

		);
	}

};

export default Account;
