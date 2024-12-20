import React, {useState} from "react";
import styling from "../style/HotelDescriptionPage.module.css";

function Price(props){

    return(
        <div className={styling.price}>
            <h5>{props.header}</h5>
            <p>{props.price} ر.س</p>
        </div>
    )
}



export default Price;