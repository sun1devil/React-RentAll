import React from "react";

import {render} from 'react-dom';

import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import moment from "moment";

import 'react-infinite-calendar/styles.css';


const MultipleDatesCalendar = withMultipleDates(Calendar);

class ItemCalendar extends React.Component {
	constructor(props){
		super(props)
	}
  state ={
    days: this.props.disabled
  }

  componentWillMount(){
    this.dayDisabler()
  }

  dayDisabler(){
    const today = parseInt(moment().format("DD"));
    const month = parseInt(moment().format("M")) - 1;
    console.log("month", month)
    for(let i = 0; i < today; i++){
      this.state.days.push(new Date(2018,month,i))
    }
  }

    render() {
        return (
            <div>
		      <InfiniteCalendar
				      Component={MultipleDatesCalendar}
				      interpolateSelection={defaultMultipleDateInterpolation}
				      selected={this.props.selected}
				      onSelect={this.props.grabDates}
              disabledDates={this.state.days}
              min={new Date()}
              max={new Date(2018,9,30)}
              height={250}/>
            </div>
        );
    }
}

export default ItemCalendar;








