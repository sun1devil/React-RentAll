import React from "react";
import "./style.css";
import API from "../../utils/API";

import { FormGroup, FormControl, Checkbox, Radio, ControlLabel, Button, HelpBlock} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup id={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class ProfileForm extends React.Component {

	// logic for getting all the form input values
	// logic for seperating out the lcoation into
		// address, city, state, zip, lat, long

	// logic for creating / posting form data here

	// add google auto fill for loaction here
	render(){
		return(
		 <form>
		 	<FieldGroup
		      id="user-first-name"
		      type="text"
		      label="First Name"
		    />
		    <FieldGroup
		      id="user-last-name"
		      type="text"
		      label="Last Name"
		    />
		    <FieldGroup
		      id="user-email"
		      type="email"
		      label="Email"
		    />


		    <FieldGroup
		      id="formControlsPrice"
		      type="number"
		      label="phone"
		    />

		    <Button type="submit">Submit</Button>
		  </form>


		)
	}
}

export default ProfileForm;
