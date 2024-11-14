import React from "react";
import FooterStyling from "../style/Footer.module.css"


function Footer() {
    return (<div className={FooterStyling.footer}>
        <div>
            <img src="http://localhost:3000/Image/logoFourlinesClean.png" alt="" />
            <div className={FooterStyling.info}>
                <h3>OUR HOTELS</h3>
                <p>Al-Juhayni Ajyad</p>
                <p>Al-Masar Ajyad</p>
                <p>Bilal Hotel</p>
                <p>Saeed Al-Juhani Tower</p>
            </div>

            <div className={FooterStyling.info}>
                <h3>OFFICE HOURS</h3>
                <p>Monday-Thursday:</p>
                <p>09.00 - 17.00</p>
                <p>Friday:</p>
                <p>09.00-11.00</p>
                <p>13.30-17.00</p>
            </div>

            <div className={FooterStyling.info}>
                <h3>VISIT US</h3>
                <p>Jalan Jatinegara Timur No.</p> <p> 84, Bali Mester, Jatinegara,</p> <p> Jakarta Timur</p>
            </div>
        </div>
    </div>)
}


export default Footer;