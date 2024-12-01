import React, { useState } from "react";
import Price from "./price";
import styling from "../style/HotelDescriptionPage.module.css";

function PriceContainer(props) {

    return (
        <div className={styling.priceContainer}>
            <Price
                header="Double"
                price={props.double ? props.double : "-"}
            />

            <Price
                header="Triple"
                price={props.triple ? props.triple : "-"}
            />

            <Price
                header="Quad"
                price={props.quad ? props.quad : "-"}
            />

            <Price
                header="Quint"
                price={props.quint ? props.quint : "-"}
            />
        </div>
    )
}

export default PriceContainer;