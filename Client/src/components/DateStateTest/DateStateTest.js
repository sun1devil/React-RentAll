import React from "react"
import Test from "../Test"


class DateStateTest extends React.Component {
    state = {
        selectedDates: []
    }
    grabDates(date) {
        // format date year/month/day
        // months start at 0 end at 11 (jan - dec)
        this.state.selectedDates.push(date);
        
    }
    handleRentSubmit(e){
       e.preventDefault()
       console.log("selected", this.state.selectedDates);
       // sort dates 
       // create an obj that has a unique key for each month
       // and each month has dates and totalDays and year
       /*
        const availability = {
            month:{
                dates: [yyyy/m/d,yyyy/m/d],
                year: yyyy,
                totalMonthDays: num
            }
            // grab item id
        }
       */
    }
    render () {
        return (
            <div>
                <form>
                    <Test grabDates={this.grabDates.bind(this)}/>
                    <button onClick={this.handleRentSubmit.bind(this)}>submit</button>
                </form>
            </div>
        )
    }
}


export default DateStateTest



