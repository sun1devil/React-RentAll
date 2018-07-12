import React from "react";
import "./style.css";

// helper functions
import API from "../../utils/API";

import Autosuggest from 'react-autosuggest';

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


class Search extends React.Component {
	constructor() {
	    super();

	    // Autosuggest is a controlled component.
	    // This means that you need to provide an input value
	    // and an onChange handler that updates this value (see below).
	    // Suggestions also need to be provided to the Autosuggest,
	    // and they are initially empty because the Autosuggest is closed.

    	this.capture = this.capture.bind(this);
  	}
	state = {
      value: '',
      suggestions: [],
      address: '',
      categories:[]
	};

	componentDidMount(){
		if(this.props.updatePath){
		  this.props.updatePath();
		}
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

	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions = value => {
	  const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

	  return inputLength === 0 ? [] : this.state.categories.filter(category =>
	    category.name.toLowerCase().slice(0, inputLength) === inputValue
	  );
	};


	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	getSuggestionValue = suggestion => suggestion.name;

	// Use your imagination to render suggestions.
	renderSuggestion = suggestion => (

		<div>
	    	{suggestion.name}
	 	 </div>
	);




    handleChange = address => {
      this.setState(
        {
          address: address
        });
    };

	handleSelect = address => {
		geocodeByAddress(address)
		  .then(results => getLatLng(results[0]))
		  .then(latLng => console.log('Success', latLng))
		  .catch(error => console.error('Error', error));
	};

	onChange = (event, { newValue }) => {
		this.setState({
		  value: newValue
		});
	};

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
		  suggestions: this.getSuggestions(value)
		});
	};

  // Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: []
		});
	};

	// call on the parent function and pass in the two input values
	capture(){
		let categoryUUID = "";
		const categories = this.state.categories;
		for(var i = 0; i< categories.length;i++){
			if(categories[i].name === this.state.value){
				categoryUUID = categories[i].uuid;
				break;
			}
		}
		// console.log("search", categoryUUID, this.state)
		return (this.props.searchPageResults(this.state.value, this.state.address, categoryUUID));
	}

    // Finally, render it!
    render(){

    const thisComponent = this;

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'SEARCH AN ITEM',
      value,
      onChange: this.onChange
    };
    return (
    <div id="search-wrap">
      	<Autosuggest id="autosuggest" suggestions={suggestions} onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} onSuggestionsClearRequested={this.onSuggestionsClearRequested} getSuggestionValue={this.getSuggestionValue} renderSuggestion={this.renderSuggestion} inputProps={inputProps} />

		<PlacesAutocomplete
			value={this.state.address}
			onChange={this.handleChange}
			onSelect={this.handleSelect}
		>
        	{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
			<div>
            	<input{...getInputProps({  placeholder: 'SEARCH A PLACE',  className: 'location-search-input search-item',})} />
	            <div className="autocomplete-dropdown-container search-item-wrap">
	              {loading && <div>Loading...</div>}
	              {suggestions.map(suggestion => {
	                const className = suggestion.active
	                  ? 'suggestion-item--active'
	                  : 'suggestion-item';
	                // inline style for demonstration purpose
	                return (
	                <div
	                    {...getSuggestionItemProps(suggestion, {
	                      className

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
        <button className={`btn ${thisComponent.props.styling}`} onClick={thisComponent.capture}>{thisComponent.props.searchText}</button>
    </div>
    );
	}
  }

export default Search;
