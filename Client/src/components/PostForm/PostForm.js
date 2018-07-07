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

class PostForm extends React.Component {

	handlePostSubmit(e){

		e.preventDefault();

		const item = {
			name: document.getElementById("item-name").value,
			description: document.getElementById("item-descript").value,
			price: document.getElementById("item-price").value,
			rate: document.getElementById("item-rate").value,

			featured: document.getElementById("item-featured").value
		}
		// API.postItem(item)
	}

	render(){
		return(
		 <form>
		 	<FieldGroup
		      id="item-name"
		      type="text"
		      label="short description"
		    />
		    <FormGroup>
		      <ControlLabel>long description</ControlLabel>
		    	<FormControl componentClass="textarea" id="item-descript"/>
		    </FormGroup>
		    <FieldGroup
		      id="item-image"
		      type="file"
		      label="image"
		    />
		    <FieldGroup
		      id="formControlsPrice"
		      type="number"
		      label="price"
		    />
		    <FormGroup>
		     <ControlLabel>rate</ControlLabel>
		      <Radio name="rate" inline>
		        by hour
		      </Radio>{' '}
		      <Radio name="rate" inline>
		        by day
		      </Radio>{' '}

		    </FormGroup>
		     <FormGroup>
		     <ControlLabel>Feature your item</ControlLabel>
		     <Checkbox>
		      Featured<sup className="featured">*</sup>
		    </Checkbox>
		    </FormGroup>
		    <FormGroup>
		      <FormControl.Static className="featured">*by checking this box you agree to a fee</FormControl.Static>
		    </FormGroup>

		    <Button type="submit">Submit</Button>
		  </form>


		)
	}
}










export default PostForm;
