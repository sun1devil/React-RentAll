import React from "react";
import "./style.css";

import API from "../../utils/API";

import ItemCalendar from "../ItemCalendar";

import { FormGroup, FormControl, Checkbox, Radio, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import moment from "moment";


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
	 state = {
        monthsObj: {},
        selectedDates: []
    }

    componentWillMount(){
        this.createMonthsObj()
    }

	createMonthsObj(){
        // use moment to create an array of all months
        const months = moment.months();

        months.forEach(month=>{
            // for each month update monthsObj state
            // with a key of the month and value of an empty array;
            this.state.monthsObj[month] = []
        })
    }

    grabDates(date) {
        const selectedDate = moment(date).format('MM/D/YYYY');
        const formattedMonth = moment(date).format('MMMM');
        //at the key in monthsObj add selectedDate to array
        // to use a variavle as a obj key you must use bracket notation (vs dot notation)
        this.state.monthsObj[formattedMonth].push(selectedDate);
    }

    handlePostSubmit(e) {
        e.preventDefault()

		const item = {
			name: document.getElementById("item-name").value,
			description: document.getElementById("item-descript").value,
			price: document.getElementById("item-price").value,
			rate: document.getElementById("item-rate").value,

			featured: document.getElementById("item-featured").value
		}
		// API.postItem(item)



       console.log("dates", this.state.monthsObj);
        // create an empty obj to hold all the filtered keys from months obj (only keys with value)
        const filteredMonths = {};

        // loop through all the keys in the monthsObj
        for (var key in this.state.monthsObj){
            // if the key has value
            // add it to the new obj (filteredMonths)
            if(this.state.monthsObj[key].length>0){
                const daysArray = this.state.monthsObj[key]
                filteredMonths[key] =  daysArray.toString();
            }
        }
        console.log(filteredMonths);
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

		    <ItemCalendar
		    	grabDates={this.grabDates.bind(this)}
                selected={this.state.selectedDates} />
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
