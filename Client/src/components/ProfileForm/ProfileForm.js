import React, {Component} from 'react';

import API from "../../utils/API";

import { FormGroup, FormControl, Checkbox, Radio, ControlLabel, HelpBlock} from 'react-bootstrap';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import { CardElement, injectStripe} from 'react-stripe-elements';



import "./style.css";

// boostrap input field helper function
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup >
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} id={id} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class ProfileForm extends React.Component {

	constructor(props){
		super(props)
		this.submit = this.submit.bind(this);
	}

	state = {
		name: this.props.initailState.name,
    	street: this.props.initailState.street,
    	city:this.props.initailState.city,
    	state: this.props.initailState.state,
    	zip: this.props.initailState.zip,
    	country: this.props.initailState.country,
    	phone: this.props.initailState.phone,
		complete: false,
		address: '',
		addressArray:[],
		update: this.props.initailState.update
	}

	componentDidMount(){
		if(this.props.initailState.street.length >0){
			this.setState({
				address: `${this.props.initailState.street},${this.props.initailState.city},${this.props.initailState.state}, ${this.props.initailState.country}`,
			})
		}
	}

	// autofill location component
	handleChange = address => {
		const addressArray = address.split(",");
		// console.log(addressArray)
      this.setState(
        {
          address: address,
          addressArray: addressArray
        });
    };


    // autofill location component gets lat and lng
	handleSelect = address => {
		geocodeByAddress(address)
		  .then(results => getLatLng(results[0]))
		  .then(latLng => {
		  	this.setState({
		  		lat: latLng.lat,
		  		lng: latLng.lng
		  	});
		  })
		  .catch(error => console.error('Error', error));
	}

	getCookie(name) {
	  const value = document.cookie;
	  let parts = value.split(" ");
	  parts = parts[0].split("=");

	  return(decodeURIComponent(parts[1]))
	}

	// ON CLICK SUBMIT form (for strip and server)
	async submit(ev) {

		// add back input flags for required inputs
		const parentForm = ev.target.closest('form');
	    if (!parentForm.checkValidity()) return;

	    ev.preventDefault();

	    const userData = {
	    	name: document.getElementById("user-name").value.trim(),
	    	street: this.state.addressArray[0],
	    	city: this.state.addressArray[1],
	    	state: this.state.addressArray[2],
	    	country: this.state.addressArray[3],
	    	phone: document.getElementById("user-phone").value.trim(),
	    	lat: this.state.lat,
	    	lng: this.state.lng
	    }

	    const userEmail = this.getCookie("user_email");

	    if(!this.state.update){
		    // stripe doing is dark magic gives back a token for the cc info
		    let {token} = await this.props.stripe.createToken({name: "Name"});

		    // user data and stripe data to be sent to server
		   const accountData = {
		    	user: userData,
		    	stripeToken: token,
		    	email: userEmail
		    }
		    console.log(accountData)
		    // call function (CREATE) and send in helper function data ,
		    // helper function will call the server and send that data to
			await this.userAccount(API.createAccount, accountData);
		}
		else {
			// call function (PUT) and send in helper function data ,
		    // helper function will call the server and send that data to
			this.userAccount(API.updateAccount, userData);
		}
	}

	// function that calls helper function that make request to server
	// for create or update account
	userAccount(actionFunction, data){
		actionFunction(data)
		.then(results=>{
			// console.log("results", results);
			this.props.getUserAccount();

		})
		.catch(err=>console.log("err",err))
	}

	showCC(){
		if(this.state.update){
			return("");
		}
		return (<CardElement />);
	}

	showCancel(){
		if (this.state.update) {
			return(
				<button onClick={this.props.cancelUpdate} className="light-btn btn">Cancel</button>
			)
		}
		return("");
	}


	render(){
		return(
		 <form id="account-form">

		 	<FieldGroup
		      id="user-name"
		      type="text"
		      label="Full Name"
		      defaultValue={this.state.name}
		      required/>
		    <label>
		    address
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}>
        		{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div>
	            	<input{...getInputProps({  placeholder: 'SEARCH A PLACE',  className: 'location-search-input',})} id="address" required />
		            <div className="autocomplete-dropdown-container">
		              {loading && <div>Loading...</div>}
		              {suggestions.map(suggestion => {
		                const className = suggestion.active
		                  ? 'suggestion-item--active'
		                  : 'suggestion-item';
		                // inline style for demonstration purpose
		                const style = suggestion.active
		                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
		                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
		                return (
		                <div
		                    {...getSuggestionItemProps(suggestion, {
		                      className,
		                      style,
		                    })}
		                >
	                    	<span>{suggestion.description}</span>
	                  	</div>
	                	);
	              	})}
            	</div>
          		</div>
        		)}
      		</PlacesAutocomplete>
      		</label>

		    <FieldGroup
		      id="user-phone"
		      type="number"
		      label="phone"
		      required
		      defaultValue={this.state.phone}/>

		      {this.showCC()}

         	<button onClick={this.submit} className="dark-btn btn">Submit</button>

         	{this.showCancel()}

		  </form>


		)
	}
}

export default  injectStripe(ProfileForm);
