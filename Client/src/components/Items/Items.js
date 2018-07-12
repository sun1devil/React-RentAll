import React from "react";
import "./style.css";

import Popup from '../Popup';

import ItemCalendar from "../ItemCalendar";

import moment from "moment";

import API from "../../utils/API";

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

  // when user clicks on an item to rent
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
			chosenDates: [],
			item: []

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
        this.state.item.disabled.push(new Date(year,month,day))
        this.state.chosenDates.push(selectedDate);

        console.log(this.state.monthsObj);
    }

    formatDates(){
    	const itemDates = this.state.item.availability
    	// console.log(itemDates)
    	if(itemDates){
    		itemDates.forEach(date => {
	    		const day = moment(date).format('YYYY,MM,D')
	    		this.state.availabileDates.push(new Date(day))
    		})
    	}
    }

    approveCharge(e){
    	e.preventDefault();
    	this.setState({
    		approve: true
    	})
    }

    handlePay(){
    	console.log("pay")
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
      return(
          <div>
            <p>{this.state.item.category}</p>
            <p>{this.state.item.description}</p>
            <ItemCalendar
              grabDates={this.grabDates.bind(this)}
                    selected={this.state.availabileDates}
                    disabled={this.state.item.disabled}/>
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
		if(!this.state.approve){
      return(
        this.createInitalRentalModal()
      )
    }
    // user has selected dates and clicked continue
    // display the rental details and the total with a pay button
		else if(this.state.approve){
  			return(
  				<div>
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
  				<p>error</p>
  				</div>
				)
			}
      // display confirmation
			return(
				<div>
					<p>confirmation</p>
				</div>
			)
		}
	}

  handlePay(){
    const rental = {
      itemUUID: this.state.item.uuui,
      rentalTotal: this.state.total,
      formatMonths: this.state.formattedMonthObj,
      availabileDates: this.state.availabileDates
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

							<p>{result.category}</p>
							<p>{result.description}</p>
							<p>${result.price}/{result.rate}</p>
							<button className="btn light-btn" onClick={this.rentItem.bind(this)} data-index={index}>rent</button>
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

