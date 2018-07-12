import React, { Component } from 'react';
// import React from "react";

import AccountContent from "../components/AccountContent";
import ProfileForm from "../components/ProfileForm";

import {Elements, StripeProvider} from 'react-stripe-elements';

// import { Tab, Row, Col} from 'react-bootstrap';

import API from "../utils/API";

class Account extends React.Component {

	// initial state of profile
	state = {
		name: "",
		street: "",
		city: "",
		state: "",
		country: "",
		zip: '',
		phone: '',
		createdAt: "",
		lastFour: '',
		cardExpire: "",
		showForm: true,
		hasData: false,
		update: false
	}

	// before first render get all the users account info
	componentWillMount(){
		this.getUserAccount();
	}

	// make a call to the server using a helper function
	// update state with user account info
	// if there isn't data for the user account do nothing
	getUserAccount(){
		API.getUserAccount()
		.then(data => {return data.json()})
		.then(jsonObj => {
			// console.log("jsonObj",jsonObj)
			// if there is account data
			if(Object.keys(jsonObj).length > 0){
				// console.log("has keys")
				this.setState({
					name: jsonObj.name,
					street: jsonObj.street,
					city: jsonObj.city,
					state: jsonObj.state,
					zip: jsonObj.zip,
					country: jsonObj.country,
					phone: jsonObj.phone,
					lastFour: jsonObj.lastFour,
					cardExpire: jsonObj.cardExpire,
					createdAt: jsonObj.createdAt,
					hasData: true,
					showForm: false
				});

			}
		})
	  	.catch(err => console.log("err",err));
	}

	updateForm(){
		this.setState({
			showForm: true,
			update: true
		})
	}

	cancelUpdate(){
		this.setState({
			showForm: false,
			update: false
		})
	}


	// conditional rendering
	// if there is user account data
	// display the data as text
	// else show a form to add data
		// create a .env file for api key
		// create a key file for env (put in utils)
	renderAccountProfile(){
		if(!this.state.showForm){
			return(
				<div>
					<p>{this.state.name}</p>
					<p>{this.state.street}, {this.state.city}, {this.state.state}, {this.state.zip}, {this.state.country}</p>
					<p>{this.state.phone}</p>
					<p>{this.state.lastFour} {this.state.cardExpire}</p>
					<p>{this.state.createdAt}</p>
					<button onClick={this.updateForm.bind(this)} className="light-btn btn">update</button>
				</div>
			);
		}else if(this.state.showForm){
			return(
				<StripeProvider apiKey="pk_test_SApe4IbFlLkIuNCim7SBQ7Pw">
					<Elements>
						<ProfileForm initailState={this.state} cancelUpdate={this.cancelUpdate.bind(this)} getUserAccount={this.getUserAccount.bind(this)}/>
					</Elements>
				</StripeProvider>)
		}
	}



	// render tabbed content
	render(){
		return(
			 <div id="acount">
			 	<AccountContent renderAccountProfile={this.renderAccountProfile.bind(this)}/>
			</div>

		);
	}

};

export default Account;
