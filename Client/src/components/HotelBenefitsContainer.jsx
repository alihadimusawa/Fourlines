import React from "react";
import HotelBenefit from "./HotelBenefit";
import HotelStyling from "../style/HotelDescriptionPage.module.css";

function HotelBenefitsContainer(props) {
    return (
        <div className={HotelStyling.benefitContainer}>
            <HotelBenefit
                header="Rate"
                benefit={props.rating}
            />

            <HotelBenefit
                header="Jarak"
                benefit={props.jarak}
            />

            <HotelBenefit
                header="Kamar Tersedia"
                benefit={props.kamar}
            />

            <HotelBenefit
                header="Transportasi"
                benefit={props.transportasi}
            />
        </div>
    )
}

export default HotelBenefitsContainer;