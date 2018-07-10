import React from "react";
import "./style.css";

import Autosuggest from 'react-autosuggest';

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
// Imagine you have a list of languages that you'd like to autosuggest.

const languages = [
  {
    name: 'C'

  },
  {
    name: 'Elm'

  },
  {
    name: "Elephant"
  },
  {
    name: "Elmer's Glue"
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Search extends React.Component {
	constructor() {
	    super();

	    // Autosuggest is a controlled component.
	    // This means that you need to provide an input value
	    // and an onChange handler that updates this value (see below).
	    // Suggestions also need to be provided to the Autosuggest,
	    // and they are initially empty because the Autosuggest is closed.
	     this.state = {
	      value: '',
	      suggestions: [],
	      address: ''
	    };
    	this.capture = this.capture.bind(this);
  	}


	componentDidMount(){
		if(this.props.updatePath){
		  console.log("test")
		  this.props.updatePath()
		}
	}

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
		  suggestions: getSuggestions(value)
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
		return (this.props.searchPageResults(this.state.value, this.state.address));
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
    <div>
      	<Autosuggest suggestions={suggestions} onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} onSuggestionsClearRequested={this.onSuggestionsClearRequested} getSuggestionValue={getSuggestionValue} renderSuggestion={renderSuggestion} inputProps={inputProps} />

		<PlacesAutocomplete
			value={this.state.address}
			onChange={this.handleChange}
			onSelect={this.handleSelect}
		>
        	{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
			<div>
            	<input{...getInputProps({  placeholder: 'SEARCH A PLACE',  className: 'location-search-input',})} />
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
        <button className="btn searchBtn" onClick={thisComponent.capture}>{thisComponent.props.searchText}</button>
    </div>
    );
	}
  }

export default Search;
