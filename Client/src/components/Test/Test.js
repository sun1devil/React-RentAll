import React from "react";
// import Test from "../components/Test";
// import Autocomplete from 'react-toolbox/lib/autocomplete';

// const TestHome = () => (
//   <div>
//     <Test page="HOME"/>
//     onst source = {
//   'ES-es': 'Spain',
//   'TH-th': 'Thailand',
//   'EN-gb': 'England',
//   'EN-en': 'USA'
// };

class Test extends React.Component {

 	render(){
 		return(
 			<p>{this.props.description}</p>
 		)
 	}
}

export default Test;
