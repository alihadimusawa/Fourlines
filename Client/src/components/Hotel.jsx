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
                <p>
                    {props.description}
                </p>

                <div className="mainFeatureContainer">
                    <div className="feature">
                        <img src="http://localhost:3000/icon/makkahIcon.png" alt="" id="icon" />
                        <div>
                            <span className="bold">{props.distance}</span><br />
                            From Mecca
                        </div>
                    </div>

                    <div className="feature">
                        <img src="http://localhost:3000/icon/shuttleIcon.png" alt="" id="icon" />
                        <div>
                            <span className="bold">Shuttle Bus</span> <br />
                            Pick and Drop
                        </div>
                    </div>

                    <div className="feature">
                        <img src="http://localhost:3000/icon/priceIcon.png" alt="" id="icon" />
                        <div>
                            <span className="bold"> {props.lowestPrice}</span> sar - <span className="bold">{props.highestPrice}</span> sar
                        </div>
                    </div>

                    <div className="feature">
                        <img src="http://localhost:3000/icon/hotelIcon.png" alt="" id="icon" />
                        <div>
                            <span className="bold">{props.distance}</span><br />
                            From Mecca
                        </div>
                    </div>

                </div>

                <button>More...
                    <img src="http://localhost:3000/Icon/arrowRightIcon.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default Hotel; 