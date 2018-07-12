import React from "react";
import "./style.css";

import Tooltip from '@material-ui/core/Tooltip';

class Banner extends React.Component {

	state = {
		bannerItems: ["cards","chair","luggage","bbq","sewing","screen","camera","bike","mower","kayak","headphones","crate","rake","backpack","mixer","fan"]
	}

	componentDidMount(){
		this.changePosition();
	}

	// scoll effect for banner images
	changePosition(){
		// get all image and store in ana array
		const bannerImg = document.querySelectorAll(".banner-item");
		if(bannerImg.length>0){
			const bannerLoop = setInterval(function(){
			// loop through image array
			bannerImg.forEach((elem)=>{
				// console.log(elem);
				// for each image
				// getting the elements id and add a hash in front
				const elemId = "#"+elem.id;

				// to fix issue caused by history.push on homeHero redirect
				// check if this element is on the page
				// if its not stop the interval
				if(document.querySelector(elemId) === null){
					 clearInterval(bannerLoop);
				}else{
					// get the current elements current left position and converto to int (this come in as pixels)
					const currentLeft = parseInt(window.getComputedStyle(document.querySelector(elemId)).left);
					// add 1 pixel to the currentLeft integer
					const plusOne = currentLeft+1

					let newLeft;

					// if plusOne value is greater than the browser width
					if(plusOne > window.innerWidth){
						// position the image off screen on the left
						newLeft = "-120px";
					}else {
						// continue to move image toward the right
						// have to conver num back to a sting to add "px" to it
						newLeft = plusOne.toString();
						newLeft = newLeft + "px"
					}
					// take current elemetn and add new left postion styling
					document.querySelector(elemId).style.left = newLeft

				}

			});
			}, 40);
		}

	}

	render(){
		// console.log(this.state.bannerItems)

		return(
			<div id="banner" className="clearfix" align="center">
				{this.state.bannerItems.map((item, index)=>{
				return(

					<Tooltip id="tooltip-icon" title={item} key={index}>
		      			<img id={`banneritem-${index}`} className="banner-item" src={`./assets/img/${item}.png`} alt={item}/>
		      		</Tooltip>
		      	)
				})}

			</div>
		);
	}
}


export default Banner;
