import React from "react";
import {useParams} from "react-router-dom";


function HotelDescriptionPage(){

    const {hotel_id} = useParams()

    return(
        <h1>{hotel_id}</h1>
    )
}


export default HotelDescriptionPage;