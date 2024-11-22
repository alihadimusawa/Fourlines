import React from "react";
import HotelStyling from "../style/Hotel.module.css";
import "../style/index.css";
import { useNavigate } from "react-router-dom";

function Hotel(props) {

    const navigate = useNavigate();

    function hotelDescriptionRedirect(hotel_id) {
        navigate(`/hotelDescription/${hotel_id}`);
    }

    return (
        <div id={HotelStyling.hotel}>

            <div className={HotelStyling.show}>
                <img id={HotelStyling.hotelImage} src={props.image} alt={props.hotelName} />

                <div className={HotelStyling.hotel_right_container}>
                    <h1 className="bold" onClick={() => hotelDescriptionRedirect(props.hotel_id)}>{props.hotelName}</h1>
                    <p>
                        {props.description.substring(0, 300)}...
                    </p>

                    <button onClick={() => hotelDescriptionRedirect(props.hotel_id)}>
                        <p>More...</p>
                        <img src="http://localhost:3000/Icon/arrowRightIcon.png" alt="" />
                    </button>

                </div>
            </div>

            <div className={HotelStyling.hotel_right_popup}>
                <div className={HotelStyling.feature}>
                    <img src="http://localhost:3000/icon/makkahIcon.png" alt="" id="icon" />
                    <div>
                        {props.distance}
                    </div>
                </div>

                <div className={HotelStyling.feature}>
                    <img src="http://localhost:3000/icon/shuttleIcon.png" alt="" id="icon" />
                    <div>
                        Shuttle Bus
                    </div>
                </div>

                <div className={HotelStyling.feature}>
                    <img src="http://localhost:3000/icon/priceIcon.png" alt="" id="icon" />
                    <div>
                        {props.lowestPrice} - {props.highestPrice}
                    </div>
                </div>

                <div className={HotelStyling.feature}>
                    <img src="http://localhost:3000/icon/hotelIcon.png" alt="" id="icon" />
                    <div>
                        {props.rating}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hotel; 