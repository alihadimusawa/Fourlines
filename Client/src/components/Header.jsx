import React from "react";
import {useNavigate} from "react-router-dom";
import HeaderStyling from "../style/Header.module.css";
import "../style/index.css";

function Header() {

    const navigate = useNavigate();

    function toHomepage(){
        navigate("/");
    }

    return (<div className={HeaderStyling.header}>
        <header>
            <div className={HeaderStyling.left} onClick={toHomepage}>
                <img src="http://localhost:3000/image/logoFourlines.png" alt="" />
            </div>

            <div className={HeaderStyling.right}>
                <a href="/">HOME</a>
                <a href="/Articles">ARTICLE</a>
                <a href="/Hotels" id={HeaderStyling.hotel}>HOTELS</a>
                <a href="/AboutUs">ABOUT</a>
                <a href="/Admin">ADMIN</a>
            </div>
        </header>
    </div>)
}


export default Header;