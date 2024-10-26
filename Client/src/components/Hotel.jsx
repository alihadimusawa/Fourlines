import React from "react";

function Hotel(props){
    return (
        <div id="hotel">
            <img src={props.image} alt={props.hotelName}/>
            <div id="hotel-right-container">
                <h1 className="bold">{props.hotelName}</h1>
                <h3>Price: {props.lowestPrice} ras - {props.highestPrice} ras</h3>
            </div>
        </div>
    )
}

export default Hotel; 