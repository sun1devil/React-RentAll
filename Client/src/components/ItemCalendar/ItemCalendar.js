import React from "react";

import {render} from 'react-dom';

import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';

import 'react-infinite-calendar/styles.css';


const MultipleDatesCalendar = withMultipleDates(Calendar);

class ItemCalendar extends React.Component {
	constructor(props){
		super(props)
	}

    render() {
        return (
            <div>
		      <InfiniteCalendar
				      Component={MultipleDatesCalendar}
				      interpolateSelection={defaultMultipleDateInterpolation}
				      selected={this.props.selected}
				      onSelect={this.props.grabDates}/>

            </div>
        );
    }
}

export default ItemCalendar;








