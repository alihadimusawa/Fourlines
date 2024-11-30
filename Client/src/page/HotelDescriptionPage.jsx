import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PriceContainer from "../components/priceContainer";
import HotelBenefitsContainer from "../components/HotelBenefitsContainer";
import HotelStyling from "../style/HotelDescriptionPage.module.css";
import CustomDropdown from "../components/CustomDropdown";

// --------- Material UI ---------
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import dayjs from "dayjs";


function HotelDescriptionPage() {

    const { hotel_id } = useParams();

    // ---------- Getting hotel prices from the server ----------
    const [hotelPrices, setHotelPrices] = useState(null);

    async function getHotelsPrices(hotel_id) {
        try {
            const response = await axios.post(`http://localhost:3000/getHotelPrices/${hotel_id}`);
            setHotelPrices(response.data);

            // set the hotel distance
            var distance = response[0].distance;
            var km = false;
            if (distance >= 1000) {
                km = true;
                distance = distance / 1000;
            }

        } catch (error) {
            console.log(error);
        }
    }

    // ---------- Get the price to be displayed on the website  ----------
    const [priceId, setPriceId] = useState("0");
    const [userDate, setUserDate] = useState(dayjs("00/00/0000"));

    // function to convert a string formatted like this 30-12-2024 to a Date object
    function convertToDate(dateString) {
        const parts = dateString.split("-");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        const dateObject = new Date(year, month, day);
        return dateObject;
    }


    // USE EFFECT FOR UPDATING THE PRICE WHENEVER THE USER CHANGE THE DATE
    useEffect(() => {
        // Convert the current User Date that we got from the material UI to a regular Date object
        let day = userDate.$D;
        let month = userDate.$M;
        month += 1;

        let year = userDate.$y;
        // to get the current year
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();

        if (currentYear != year) {
            year = 1001;
            console.log("not the same")
        } else {
            year = 1000;
        }

        console.log("program year = " + year);

        let newUser = day + "-" + month + "-" + year;
        newUser = convertToDate(newUser);
        console.log(newUser);

        hotelPrices && hotelPrices.forEach((current) => {
            let mulaiDate = convertToDate(current.mulai);
            let akhirDate = convertToDate(current.akhir);
            if (newUser >= mulaiDate && newUser <= akhirDate) {
                setPriceId(current.price_id);
            }

            if (newUser < mulaiDate) {
                console.log("user date dipilih sebelum mulai date");
                console.log(mulaiDate);
                console.log(newUser);
                console.log("\n");
            }

            if (newUser > akhirDate) {
                console.log("user date dipilih setelah akhir date");
                console.log(akhirDate);
                console.log("\n");
            }


        });

    }, [userDate]);




    // ---------- Get the hotel images  ----------
    const [hotelImages, setHotelImages] = useState([]);

    async function getHotelsImages(hotel_id) {
        try {
            const response = await axios.post(`http://localhost:3000/getHotelImageById/${hotel_id}`)
            setHotelImages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // USE EFFECT FOR TAKING THE FIRST PRICES, AND IMAGES
    useEffect(() => {
        getHotelsPrices(hotel_id);
        getHotelsImages(hotel_id);
    }, []);




    return (
        <div className={HotelStyling.page}>

            {/* -------- TOP -------- */}
            <div className={HotelStyling.top}>
                <img src="http://localhost:3000/icon/backIcon.png" alt="Back Icon" />
                <h1>{hotelPrices && hotelPrices[0].hotel_name}</h1>
                <div className={HotelStyling.addressContainer}>
                    <img src="http://localhost:3000/icon/addressIcon.png" alt="Address Icon" />
                    <p>{hotelPrices && hotelPrices[0].address}</p>
                </div>
            </div>

            {/* -------- IMAGE SLIDESHOW -------- */}
            <div className={HotelStyling.carousel}>
                <button>«</button>

                {
                    hotelImages.map((current, index) => (
                        <img key={index} src={current.image} alt="this is an image" />
                    ))
                }


                <button>»</button>
            </div>


            {/* -------- MAIN SERVICE CONTAINER -------- */}
            <div className={HotelStyling.mainServiceContainer}>
                <img src={"http://localhost:3000/icon/makkahBlueIcon.png"} alt="" />
                <p>{distance} {km ? "km" : "m"}</p>
            </div>


            {/* -------- PRICES -------- */}
            <h3 id={HotelStyling.price}>Price</h3>
            <div id={HotelStyling.middle}>
                {
                    priceId != "0"
                        ?
                        hotelPrices.map((current, index) => (
                            current.price_id == priceId &&
                            <PriceContainer
                                key={index}
                                double={current.double}
                                triple={current.triple}
                                quad={current.quad}
                                quint={current.quint}
                            />
                        ))
                        : <PriceContainer
                            double="-"
                            triple="-"
                            quad="-"
                            quint="-"
                        />

                }

                {/* DatePicker */}
                <div className={HotelStyling.exceptional}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={userDate}
                            onChange={(newValue) => {
                                let day = dayjs(newValue.$D);
                                let month = dayjs(newValue.$M);
                                let year = dayjs(newValue.$y);
                                let tempDate = new Date(year, month, day);
                                newValue && setUserDate(dayjs(tempDate));
                            }}
                            sx={{
                                height: {
                                    xs: 0, //0
                                    sm: 0, //600
                                    md: 0, //900
                                    lg: 0, //1200
                                    xl: 0, //1536
                                },
                                width: {
                                    xs: 90, //0
                                    sm: 180, //600
                                    md: 260, //900
                                    lg: 320, //1200
                                    xl: 400, //1536
                                }
                            }}
                        />
                    </LocalizationProvider>
                </div>

            </div>

            {/* BOTTOM */}
            <div id={HotelStyling.bottom}>
                {hotelPrices &&
                    <HotelBenefitsContainer
                        rating={hotelPrices[0].rating}
                        jarak={hotelPrices[0].jarak}
                        kamar={hotelPrices[0].kamar}
                        transportasi={hotelPrices[0].transportasi}
                    />
                }
            </div>

            <button>
                <a href="https://wa.me/6287771878828?text=Hello%20there!">
                    Request
                </a>
            </button>
        </div>
    );
}

export default HotelDescriptionPage;