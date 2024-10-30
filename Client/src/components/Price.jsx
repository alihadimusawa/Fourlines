import React, {useState} from "react";
import HotelStyling from "../style/HotelDescriptionPage.module.css";

function Price(props){

    return(
        <div className={HotelStyling.price}>
            <h5>{props.header}</h5>
            <p>{props.price}</p>
        </div>
    )
}



export default Price;