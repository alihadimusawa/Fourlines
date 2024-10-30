import React, { useState } from "react";
import Price from "./price";
import HotelStyling from "../style/HotelDescriptionPage.module.css";

function PriceContainer(props) {
    const [hotel_id, setHotelId] = useState("");

    return (
        <div className={HotelStyling.priceContainer}>
            <Price
                header="Double"
                price={props.double}
            />

            <Price
                header="Triple"
                price={props.triple}
            />

            <Price
                header="Quad"
                price={props.quad}
            />

            <Price
                header="Quint"
                price={props.quint}
            />
        </div>
    )
}

export default PriceContainer;