import React from "react";

import "./style.css";

import API from "../../utils/API";

import ItemCalendar from "../ItemCalendar";

import { FormGroup, FormControl, Checkbox, Radio, ControlLabel, Button, HelpBlock} from 'react-bootstrap';

import moment from "moment";

// form item helper function – boostrap components
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup >
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} id={id}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class PostForm extends React.Component {
	constructor(props) {
    	super(props);
        this.getCategories = this.getCategories.bind(this)
	}

	state = {
        monthsObj: {},
        selectedDates: [],
        availDates:[],
        disabled: [],
        rate: '',
        feature: '',
        categories: [],
        selectedCat: "",
    }

    componentDidMount(){
        this.createMonthsObj();

        this.getCategories();
    }

    getCategories(){

        API.getCategories()
        .then(data => {return data.json()})
        .then(jsonObj=>{
            this.setState({
                categories: jsonObj
            });
        })
        .catch(err=> console.log("err",err));
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
        this.state.availDates.push(selectedDate);
        // const formattedMonth = moment(date).format('MMMM');
        //at the key in monthsObj add selectedDate to array
        // to use a variavle as a obj key you must use bracket notation (vs dot notation)
        // this.state.monthsObj[formattedMonth].push(selectedDate);
    }

    handlePostSubmit(e) {
        e.preventDefault();

        // create an empty obj to hold all the filtered keys from months obj (only keys with value)
        // const filteredMonths = {};
        // // loop through all the keys in the monthsObj
        // for (var key in this.state.monthsObj){
        //     // if the key has value
        //     // add it to the new obj (filteredMonths)
        //     if(this.state.monthsObj[key].length>0){
        //         const daysArray = this.state.monthsObj[key]
        //         filteredMonths[key] =  daysArray;
        //     }
        // }

        const data = new FormData();
	    data.append('file', document.querySelector('#itemFile').files[0]);
	    data.append('item_category', this.state.selectedCat);
        data.append('item_categoryid', document.getElementById("item-category").value);
	    data.append('item_description', document.getElementById("item-descript").value);
	    data.append('item_price', document.getElementById("item-price").value);
	    data.append('item_featured', this.state.feature);
	    data.append('available_dates', JSON.stringify(this.state.availDates));
         data.append('disabled_dates', JSON.stringify([moment().format('YYYY/MM/D')]));

        // console.log(JSON.stringify(this.state.availDates))
		this.postItem(data);
    }

    postItem(item){

    	API.postItem(item)
    	.then(data => {return data.json()})
	    .then(jsonObj=>{
	    	// console.log("db Item:", jsonObj);
            const thisComponent = this.props;
            this.props.showLoading()
            setTimeout(function(){
                 thisComponent.showConfirmation();
            }, 1000);

	    })
    	.catch(err=>{console.log("err", err)});
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

    change(event){
        const option = event.target.options[event.target.selectedIndex].text
        // console.log(option)
        this.setState({
            selectedCat: option
        })
    }
	render(){
		return(
        <div ID="post-form">
         <h2>Post your item</h2>
		 <form onSubmit={this.handlePostSubmit.bind(this)}>

		  <p>All Items rented by day</p>
		 	<FormGroup>
		      <ControlLabel>Select</ControlLabel>
		      <FormControl componentClass="select" placeholder="select" id="item-category" onChange={this.change.bind(this)}>
		        // <option>select</option>
		       	{this.state.categories.map((elem, index)=>{
		       		return(
		       			<option key={index} value={elem.uuid}>{elem.name}</option>
		       		)
		       	})}
		      </FormControl>
		    </FormGroup>
		    <FormGroup>
		      <ControlLabel>description</ControlLabel>
		    	<FormControl componentClass="textarea" id="item-descript"/>
		    </FormGroup>
		     <FieldGroup
		      id="itemFile"
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

		    <button type="submit" className="btn dark-btn">Submit</button>
		  </form>
          </div>

		)
	}
}










export default PostForm;
