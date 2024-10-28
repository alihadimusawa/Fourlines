import React from "react";
import HotelStyling from "../style/Hotel.module.css";
import "../style/index.css";
import {useNavigate} from "react-router-dom";

function Hotel(props){

    const navigate = useNavigate();

    function hotelDescriptionRedirect(hotel_id){
        navigate(`/hotelDescription/${hotel_id}`);
    }

    return (
        <div id={HotelStyling.hotel}>
            <img src={props.image} alt={props.hotelName}/>
            <div className={HotelStyling.hotel_right_container}>
                <h1 className="bold" onClick={() => hotelDescriptionRedirect(props.hotel_id)}>{props.hotelName}</h1>
                <h3 className="light">Price: {props.lowestPrice} ras - {props.highestPrice} ras</h3>
            </div>
        </div>
    )
}

export default Hotel; 