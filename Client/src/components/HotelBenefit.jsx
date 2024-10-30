import React from "react";
import HotelStyling from "../style/HotelDescriptionPage.module.css";


function HotelBenefit(props){
    return (
        <div className={HotelStyling.hotelBenefit}>
            <h5>{props.header}</h5>
            <p>{props.benefit}</p>
        </div>
    )
}

export default HotelBenefit;