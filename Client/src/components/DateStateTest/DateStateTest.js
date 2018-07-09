import React from "react"
import Test from "../Test"
const moment = require("moment")


class DateStateTest extends React.Component {
    state = {
        selectedDates: []
    }
    grabDates(date) {
        // format date year/month/day
        // months start at 0 end at 11 (jan - dec)
        // this.state.selectedDates.push(date);
        const dateCopy = this.state.selectedDates.slice()
        dateCopy.push(date)
        this.setState({
            selectedDates: dateCopy
        })
    }
    handleRentSubmit(e) {
        e.preventDefault()
        const availability = {
            month: {
                dates: [],

                // YYYY
                year: "YYYY",
                totalMonthDays: "num"

            }
            //     // grab item id
        }
        const dateArray = this.state.selectedDates.slice()
        console.log("selected", this.state.selectedDates);
        let sortedDate = [];

        for (let i = 0; i < dateArray.length; i++) {
            let day = moment(dateArray[i]);
            let formattedDay = moment(dateArray[i]).format("MM-DD-YYYY")
            console.log(formattedDay)
            sortedDate.push(formattedDay)

        }

        sortedDate.sort(function (a, b) {
            return moment(a) - moment(b)
        })



        availability.month.dates = sortedDate
        // console.log(availability)
        // this.grabMonths(sortedDate)
        availability.month.totalMonthDays = this.grabMonths(sortedDate)
        console.log(availability)
        // create an obj that has a unique key for each month
        // and each month has dates and totalDays and year

    }

    grabMonths(array) {
        //    let seperatedMonths = array.map(item=> {
        //       let month = item.split ("-")[0] 

        //    })

        console.log("this is the array", array)

        let monthObject = {
            jan: [],
            feb: [],
            mar: [],
            apr: [],
            may: [],
            jun: [],
            jul: [],
            aug: [],
            sep: [],
            oct: [],
            nov: [],
            dec: []
        }
        let monthArray = []
        let myArray = []
        let jan = []
        let feb = []
        let mar = []
        let apr = []
        let may = []
        let jun = []
        let jul = []
        let aug = []
        let sep = []
        let oct = []
        let nov = []
        let dec = []

        for (let i = 0; i < array.length; i++) {
            let month = array[i].split("-")[0]
            // console.log(month)
            switch (month) {
                case "01":
                   monthObject.jan.push(array[i])
                    break;
                case "02":
                monthObject.feb.push(array[i])
                    break;
                case "03":
                monthObject.mar.push(array[i])
                    break;
                case "04":
                monthObject.apr.push(array[i])
                    break;
                case "05":
                monthObject.may.push(array[i])
                    break;
                case "06":
                monthObject.jun.push(array[i])
                    break;
                case "07":
                monthObject.jul.push(array[i])
                    break;
                case "08":
                monthObject.aug.push(array[i])
                    break;
                case "09":
                monthObject.sep.push(array[i])
                    break;
                case "10":
                monthObject.oct.push(array[i])
                    break;
                case "11":
                monthObject.nov.push(array[i])
                    break;
                case "12":
                monthObject.dec.push(array[i])
                    break;
            }

        }
        console.log(aug)
        return monthObject



    }



    render() {
        return (
            <div>
                <form>
                    <Test grabDates={this.grabDates.bind(this)

                    }
                        selected={this.state.selectedDates} />
                    <button onClick={this.handleRentSubmit.bind(this)}>submit</button>
                </form>
            </div>
        )
    }
}


export default DateStateTest



