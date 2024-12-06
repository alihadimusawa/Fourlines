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
                <a href="/Articles">ARTICLE</a>
                <a href="#">WISATA</a>
                <a href="/Hotels" id={HeaderStyling.hotel}>HOTELS</a>
                <a href="#">PROMO</a>
                <a href="/AboutUs">ABOUT</a>
            </div>
        </header>
    </div>)
}


export default Header;