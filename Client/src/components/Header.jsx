import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderStyling from "../style/Header.module.css";
import "../style/index.css";

function Header() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    function toHomepage() {
        navigate("/");
    }

    const handleScroll = () => {
        if (window.scrollY > 50) { // Adjust the scroll threshold as needed
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`${HeaderStyling.header} ${isScrolled ? HeaderStyling.scrolled : ''}`}>
            <header>
                <div className={HeaderStyling.left} onClick={toHomepage}>
                    <img src="http://localhost:3000/image/logoFourlines.png" alt="" />
                </div>

                <div className={HeaderStyling.right}>
                    <a href="/">HOME</a>
                    <a href="/Articles">ARTICLE</a>
                    <a href="/Hotels" id={HeaderStyling.hotel}>HOTELS</a>
                    <a href="/AboutUs">ABOUT</a>
                </div>
            </header>
        </div>
    );
}

export default Header;