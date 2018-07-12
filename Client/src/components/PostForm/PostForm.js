import React from "react";

import "./style.css";

import API from "../../utils/API";

import ItemCalendar from "../ItemCalendar";

import { FormGroup, FormControl, Checkbox, Radio, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import moment from "moment";

// form item helper function – boostrap components
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
	constructor(props) {
    	super(props);
	}
	 state = {
        monthsObj: {},
        selectedDates: [],
        disabled: [],
        rate: '',
        feature: '',
        categories: ["appliance","tools","gardening","electronic", "apparel", "sporting goods", "furniture", "camping", "party", "cleaning", "cooking", "crafts", "transportation", "recreation"]
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
        const selectedDate = moment(date).format('YYYY/MM/D');
        const formattedMonth = moment(date).format('MMMM');
        //at the key in monthsObj add selectedDate to array
        // to use a variavle as a obj key you must use bracket notation (vs dot notation)
        this.state.monthsObj[formattedMonth].push(selectedDate);
    }

    handlePostSubmit(e) {
        e.preventDefault();

        const data = new FormData();
	    data.append('file', document.querySelector('#formControlsFile > input').files[0]);
	    data.append('item_category', document.getElementById("item-category").value);
	    data.append('item_description', document.getElementById("item-descript").value);
	    data.append('item_price', document.getElementById("item-price").value);
	    data.append('item_rate', this.state.rate);
	    data.append('item_featured', this.state.feature);
	    console.log(data);

	    fetch('http://localhost:8000/api/item', {
	      method: 'POST',
	      body: data,
	    })

		// const item = {
		// 	category: document.getElementById("item-category").value,
		// 	description: document.getElementById("item-descript").value,
		// 	price: document.getElementById("item-price").value,
		// 	rate: this.state.rate,
		// 	featured: this.state.feature
		// }
		// API.postItem(item)



       // console.log("dates", this.state.monthsObj);
        // create an empty obj to hold all the filtered keys from months obj (only keys with value)
        // const filteredMonths = {};

        // // loop through all the keys in the monthsObj
        // for (var key in this.state.monthsObj){
        //     // if the key has value
        //     // add it to the new obj (filteredMonths)
        //     if(this.state.monthsObj[key].length>0){
        //         const daysArray = this.state.monthsObj[key]
        //         filteredMonths[key] =  daysArray.toString();
        //     }
        // }
        // console.log(filteredMonths);
        // console.log(item);

    }

    handleRateChange(e){
    	this.setState({
      		rate: e.currentTarget.value
      	});
    }
    handleFeatured(e){
    	this.setState({
      		feature: e.currentTarget.value
      	});
    }

	render(){
		return(
		 <form onSubmit={this.handlePostSubmit.bind(this)}>
		  <h3>All Items rented by day</h3>
		 	<FormGroup>
		      <ControlLabel>Select</ControlLabel>
		      <FormControl componentClass="select" placeholder="select" id="item-category">
		        // <option>select</option>
		       	{this.state.categories.map((name, index)=>{
		       		return(
		       			<option key={index} value={name}>{name}</option>
		       		)
		       	})}
		      </FormControl>
		    </FormGroup>
		    <FormGroup>
		      <ControlLabel>description</ControlLabel>
		    	<FormControl componentClass="textarea" id="item-descript"/>
		    </FormGroup>
		     <FieldGroup
		      id="formControlsFile"
		      type="file"
		      label="File" />
		    <ItemCalendar
		    	grabDates={this.grabDates.bind(this)}
                selected={this.state.selectedDates}
                disabled={this.state.disabled}/>

			<FormGroup>
		      	<ControlLabel>price</ControlLabel>
		    		 <FieldGroup
				      id="item-price"
				      type="number"/>
		    </FormGroup>
		     <FormGroup>
		     <ControlLabel>Feature your item</ControlLabel>
		     <Checkbox onChange={this.handleFeatured.bind(this)} value="true">
		      Featured<sup className="featured">*</sup>
		    </Checkbox>
		    </FormGroup>
		    <FormGroup>
		      <FormControl.Static className="featured" >*by checking this box you agree to a fee</FormControl.Static>
		    </FormGroup>

		    <Button type="submit">Submit</Button>
		  </form>


		)
	}
}










export default PostForm;
