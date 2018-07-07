import React, {Component} from "react";
import "./style.css";

class items extends React.Component {
   //copy Moment and react datepicker code and paste, import moment.js, render datepicker
    

    render(){
        return(
<ul className="list-group search-results">
    {props.results.map(result => (
      <li key={result} className="list-group-item" data-user={result.userUUID} data-item={result.uuid}>
       <p>{result.description}</p>
       <p>{result.price}</p>
       <p>{result.rate}</p>
       <p>{result.start_date}</p>
       <p>{result.end_date}</p>
      </li>
    ))}
  </ul>
        )
    }
}

export default Items;

/*

 name:"cat", 
                description: "a cute cuddly cat",
                price: 50, 
                rate: "day", 
                start_date:"08-01-2018",
                end_date: "08-10-2018", 
                image: "url", 
                active: true, 
                feature: true, 
                UserUUID: "66584723o8jbvdkjs734iukj"


*/

// https://stackoverflow.com/questions/44258916/how-to-set-state-of-start-date-and-end-date-of-daterangepicker-in-react