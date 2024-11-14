import React from "react";
import HeaderStyling from "../style/Header.module.css";
import "../style/index.css";

function Header() {
    return (<div className={HeaderStyling.header}>
        <header>
            <div className={HeaderStyling.left}>
                <img src="http://localhost:3000/image/logoFourlines.png" alt="" />
            </div>

            <div className={HeaderStyling.right}>
                <a href="#">ARTICLE</a>
                <a href="#">WISATA</a>
                <a href="#" id={HeaderStyling.hotel}>HOTELS
                    <svg style={{ marginLeft: "0.5vw" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                    </svg>
                    <div className={HeaderStyling.dropdowns}>
                        <a href="#"><p>PRICELIST</p></a>

                        <a href="#" id={HeaderStyling.allotment}><p>ALLOTMENT
                            <svg style={{marginLeft:"0.5vw"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                            </svg></p>
                            <div className={HeaderStyling.sidedowns}>
                                <a href=""><p>Al-Mohajirin Al-Majd Hotel</p></a>
                                <a href=""><p>Nada Al-Majd Hotel</p></a>
                                <a href=""><p>Rushud Al-Majd Hotel</p></a>
                                <a href=""><p>Yasmin Al-Majd Hotel</p></a>
                                <a href=""><p>Saif Al-Majd Hotel</p></a>
                                <a href=""><p>Miaad Al-Majd Hotel</p></a>
                                <a href=""><p>Jawharet Al-Majd Hotel</p></a>
                                <a href=""><p>Kudai Tower Hotel</p></a>
                            </div>
                        </a>

                        <a href="#"><p>SPECIAL PRICE HOTEL</p></a>
                    </div>
                </a>
                <a href="#">PROMO</a>
                <a href="#">ABOUT</a>
            </div>
        </header>
    </div>)
}


export default Header;