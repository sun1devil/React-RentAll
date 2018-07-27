import React from "react";
import "./style.css";

import Popup from '../Popup';

import ItemCalendar from "../ItemCalendar";

import moment from "moment";

import API from "../../utils/API";

import { Thumbnail } from 'react-bootstrap';


// import RentForm from '../RentForm';
// import Test from '../Test';

class Items extends React.Component{

	constructor(props){
		super(props)
		this.formatDates = this.formatDates.bind(this)
	}

// initial state
	state = {
		monthsObj: {},
		formattedMonthObj: {},
		modalShow: false,
		items: this.props.results,
		item: {},
		approve: false,
		confirmation: false,
		rentalError: false,
		availabileDates: [],
    disabledDates:[],
		chosenDates: [],
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

  // when user clicks on an item to check availability
	rentItem(e){
		const button = e.target;
		const index = parseInt(button.dataset.index);
		const selectedItem = this.state.items[index];
		this.setState({
			modalShow: true,
			item: selectedItem
		})
		// console.log("open", this.state)
	}

  // close modal reset state
	handleClose() {
		this.state.item.disabled = []
		this.createMonthsObj()

		// this.state.item = []
		// this.state.chosenDates = []
		// this.state.availabileDates = []

   		this.setState({
			modalShow: false,
			availabileDates: [],
      disabledDates:[],
			chosenDates: [],
			item: [],
      approve: false,
      confirmation:false,
      rentalError: false

		})
		// console.log("state", this.state)
  	}

  	grabDates(date) {
        const selectedDate = moment(date).format('MM/D/YYYY');
       	const day = parseInt(moment(date).format('D'));
        const month = parseInt(moment(date).format('M')) - 1;
        const year = parseInt(moment(date).format('YYYY'));
        const formattedMonth = moment(date).format('MMMM');
        //at the key in monthsObj add selectedDate to array
        // to use a variavle as a obj key you must use bracket notation (vs dot notation)
        this.state.monthsObj[formattedMonth].push(selectedDate);
        this.state.disabledDates.push(new Date(year,month,day))
        this.state.chosenDates.push(selectedDate);

        console.log(this.state.monthsObj);
    }

     formatDates(){

      if(this.state.item.availability !== undefined){
        let itemDates = this.state.item.availability;
        itemDates = JSON.parse(itemDates);

        let disabledDates = this.state.item.disabled;
        disabledDates = JSON.parse(disabledDates);

      console.log("itemDates",itemDates)
      if(itemDates){
       itemDates.forEach(date => {
         const day = moment(date).format('YYYY,MM,D')
         this.state.availabileDates.push(new Date(day))
       })
       disabledDates.forEach(date => {
         const day = moment(date).format('YYYY,MM,D')
         this.state.disabledDates.push(new Date(day))
       })

      }
      }

    }

    approveCharge(e){
    	e.preventDefault();
    	this.setState({
    		approve: true
    	})
    }



  // // total months a user selected to rent
  // getTotalMonth(){
  // 	const filteredMonths = {};
  //     // loop through all the keys in the monthsObj
  //     for (var key in this.state.monthsObj){
  //         // if the key has value
  //         // add it to the new obj (filteredMonths)
  //         if(this.state.monthsObj[key].length>0){
  //             const daysArray = this.state.monthsObj[key]
  //             filteredMonths[key] =  daysArray.toString();
  //         }
  // 	}
  // 	return filteredMonths
  // }

  // calculate rental total
  getTotal(){
    	var price =  parseInt(this.state.item.price);
    	let total = 0;

  		let totalDays = this.state.chosenDates;
  		totalDays = totalDays.length
			total = totalDays * price

 		 return(total)
  }


  // inital modal content
  // item details and date selector
  createInitalRentalModal(){
    this.formatDates()

      return(

          <div>
            <h2>Item availability</h2>
            <p>{this.state.item.category}</p>
            <p>{this.state.item.description}</p>

            <ItemCalendar
              grabDates={this.grabDates.bind(this)}
                    selected={this.state.availabileDates}
                    disabled={this.state.disabledDates}/>
                    <h4>${this.state.item.price}/day</h4>
              <button className="light-btn btn round" onClick={this.approveCharge.bind(this)}><img src="./assets/img/right-arrow.png"/></button>
          </div>
        )
  }

  // conditional html/jsx creation content for the popup
	renderModalContent(){
    // if approve is false
    // user has not selected dates
    // and has not clicked continue
    // render item detail and calendar
		if(!this.state.approve && !this.state.confirmation){
      return(
        this.createInitalRentalModal()
      )
    }
    // user has selected dates and clicked continue
    // display the rental details and the total with a pay button
		else if(this.state.approve){
  			return(
  				<div>
          <h2>rental Confirmation</h2>
  					<p>{this.state.item.category}</p>
  					<p>{this.state.item.description}</p>
  					<div>
	  					{this.state.chosenDates.map((date, index)=>{
	  						return(<p key={index}>{date}</p>)
	  					})}
  					</div>
  					<button className="dark-btn btn" onClick={this.handlePay.bind(this)}>PAY <span>$</span>{this.getTotal()}</button>
  				</div>
  			)
		}
    // user has clicked pay and payment was made by the server
    // display the completion of rental content
		else if(this.state.confirmation){
      // server sent back an error when user tried to pay
      // display the error
			if(this.state.rentalError){
				return(
  			<div>
  				<h2>error</h2>
  				</div>
				)
			}
      // display confirmation
			return(
				<div>
					<h2>confirmation</h2>
				</div>
			)
		}
	}

  handlePay(){
    const rental = {
      itemUUID: this.state.item.uuui,
      ownerUUID: this.state.item.userUUID,
      rentalTotal: this.getTotal(),
      formatMonths: this.state.formattedMonthObj,
      availabileDates: this.state.availabileDates,
      chosenDates: this.state.chosenDates
    }
    // get current item info
      // item id
      // selected dates
    // total

   this.createRental(rental)
  }


  createRental(rental){
    API.createRental(rental)
    .then(data => {return data.json()})
    .then(jsonObj=>{
      // then update state confirmation true (this will cause a re render of the modal content)
      // reset state to clear like we do in close modal
      // close modal, empty chose dates, empty item etc
      this.setState({
        confirmation:true,
        approve: false
      })
    })
    .catch(err=> {
      console.log("err",err)
      // if error update state error  to true (this will cause a re render of the modal content)

    });
  }


	render(){
		const thisComponentProps = this.props;

		return(
			<div>
				{this.props.results.map((result, index)=>{

					return(
            <div key={index}>
             <Thumbnail src={`/assets/uploads/${result.uuid}.jpg`} alt={result.category} align="center">
              <h3>{result.category}</h3>
              <p>{result.description}</p>
              <p>${result.price}/day</p>
              <button className="btn light-btn" onClick={this.rentItem.bind(this)} data-index={index}>check availability</button>
            </Thumbnail>
						</div>
					)
				})}

				<Popup modalShow={this.state.modalShow} handleClose={this.handleClose.bind(this)}>
					{this.renderModalContent()}
				</ Popup>

			</div>
		)
	}
}

export default Items;

