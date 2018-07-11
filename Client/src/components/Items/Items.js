import React from "react";
import "./style.css";


class Items extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const thisComponentProps = this.props;
        console.log(thisComponentProps.results)
        return(
            <div>
                {this.props.results.map((result, index)=>{
                    return(
                        <div  key={index} className="card" >
                        <img className="card-img-top" src="..." alt="Card image cap"/>
                        <div className="card-body">
                          <h5 className="card-title">{result.category}</h5>
                          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                      </div>
                    )
                })}
            </div>
        )
    }
}

export default Items;