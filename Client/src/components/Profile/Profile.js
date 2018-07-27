import React from "react";
import "./style.css";

class Profile extends React.Component{
	render(){
		return(
			<div>
				<h2>account settings</h2>
				<p>{this.props.initialState.name}</p>
				<p>{this.props.initialState.street}, {this.props.initialState.city}, {this.props.initialState.initialState}, {this.props.initialState.zip}, {this.props.initialState.country}</p>
				<p>{this.props.initialState.phone}</p>
				<p>{this.props.initialState.lastFour} {this.props.initialState.cardExpire}</p>
				<p>{this.props.initialState.createdAt}</p>
				<button onClick={this.props.updateForm.bind(this)} className="light-btn btn">update</button>
				<button onClick={this.props.deleteAccount.bind(this)} className="dark-btn btn">delete</button>
			</div>

		)
	}
}


export default Profile;
