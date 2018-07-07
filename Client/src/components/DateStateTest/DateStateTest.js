import Test from "./components/Test"
import React from "react"


class DateStateTest extends React.Component {
    state = {
        dates: []
    }
   grabDates (selected) {
       return selected
   }
    render () {
        return (
            <div>
                <Test
                onClick = {this.grabDates}
                />
            </div>
        )
    }
}


export default DateStateTest



