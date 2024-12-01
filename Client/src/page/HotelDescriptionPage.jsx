import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PriceContainer from "../components/priceContainer";
import HotelBenefitsContainer from "../components/HotelBenefitsContainer";
import styling from "../style/HotelDescriptionPage.module.css";
import CustomDropdown from "../components/CustomDropdown";

// --------- Material UI ---------
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import dayjs from "dayjs";


function HotelDescriptionPage() {

    const { hotel_id } = useParams();

    // ---------- Getting hotel prices and changing some of the attribute from the server ----------
    const [hotelPrices, setHotelPrices] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [distance, setDistance] = useState(null);
    const [km, setKm] = useState(false);
    const [ratingImage, setRatingImage] = useState([]);

    async function getHotelsPrices(hotel_id) {
        try {
            const response = await axios.post(`http://localhost:3000/getHotelPrices/${hotel_id}`);
            setHotelPrices(response.data);
            setHotel(response.data[0]);

            var tempHotel = response.data[0];

            if(response.data[0].restaurant == "true"){
                console.log("yes");
            }else if(response.data[0].restaurant === "true"){
                console.log("no");
            }else{
                console.log("nonono");
            }
            console.log("this is the one : ", response.data[0].restaurant);

            // set the hotel distance
            if (tempHotel.jarak >= 1000) {
                setKm(true);
                console.log("true");
                tempHotel.jarak = tempHotel.jarak / 1000;
            }
            setDistance(tempHotel.jarak);

            // get the hotel rating
            var tempRating = tempHotel.rating;
            var ratingRemain = 5 - tempRating;
            while (tempRating > 0.5) {
                tempRating -= 1;
                setRatingImage((preValue) => [...preValue, "full"]);
            }

            if (tempRating % 1 == 0.5) {
                setRatingImage((preValue) => [...preValue, "half"]);
                tempRating -= 1;
            };

            while (ratingRemain > 0.5) {
                setRatingImage((preValue) => [...preValue, "empty"]);
                ratingRemain -= 1;
            };

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
        <div className={styling.page}>

            {/* -------- TOP -------- */}
            <div className={styling.top}>
                <img src="http://localhost:3000/icon/backIcon.png" alt="Back Icon" />
                <h1>{hotel && hotel.hotel_name}</h1>
                <div className={styling.addressContainer}>
                    <img src="http://localhost:3000/icon/addressIcon.png" alt="Address Icon" />
                    <p>{hotel && hotel.address}</p>
                </div>
            </div>

            {/* -------- IMAGE SLIDESHOW -------- */}
            <div className={styling.carousel}>
                <button>«</button>

                {
                    hotelImages.map((current, index) => (
                        <img key={index} src={current.image} alt="this is an image" />
                    ))
                }


                <button>»</button>
            </div>


            {/* -------- MAIN SERVICE CONTAINER -------- */}
            <div className={styling.mainServiceContainer}>
                <img src={"http://localhost:3000/icon/makkahBlueIcon.png"} alt="Makkah Icon" />
                <p>{distance} {km ? "km" : "m"}</p>

                <img src={"http://localhost:3000/icon/roomIcon.png"} alt="Room Available Icon" />
                <p>{hotel && hotel.kamar}</p>

                <img src={"http://localhost:3000/icon/shuttleBlueIcon.png"} alt="Shuttle Icon" />
                <p>{hotel && hotel.transportasi}</p>

                {
                    ratingImage.length > 0 && ratingImage.map((current, index) => {
                        if (current == "full") return <img src={"http://localhost:3000/icon/starBlueIcon.png"} alt="Star" key={index} />
                        else if (current == "half") return <img src={"http://localhost:3000/icon/starHalfIcon.png"} alt="Star half" key={index} />
                        else if (current == "empty") return <img src={"http://localhost:3000/icon/starWhiteIcon.png"} alt="Star" key={index} />
                    })
                }
                <p>{hotel && hotel.rating}</p>
            </div>


            {/* -------- DESCRIPTION AND SECONDARY SERVICE -------- */}
            <div className={styling.content}>

                <p className={styling.description}>
                    {hotel && hotel.description}
                </p>

                {/* SECONDARY SERVICE CONTAINER */}
                <div className={styling.secondaryService}>
                {
                        hotel && hotel.restaurant == "true" && (
                            <div>
                                <img src={"http://localhost:3000/icon/restaurantIcon.png"} alt="restaurant Icon" /> 
                                <p>Restaurant</p>
                            </div>
                        )
                    }
                    {
                        hotel && hotel.gym == "true" && (
                            <div>
                                <img src={"http://localhost:3000/icon/gymIcon.png"} alt="Gym Icon" /> 
                                <p>Gym</p>
                            </div>
                        )
                    }
                    {
                        hotel && hotel.laundry == "true" && (
                            <div>
                                <img src={"http://localhost:3000/icon/laundryIcon.png"} alt="laundry icon" /> 
                                <p>Free Laundry</p>
                            </div>
                        )
                    }
                    {
                        hotel && hotel.cafe == "true" && (
                            <div>
                                <img src={"http://localhost:3000/icon/caffeIcon.png"} alt="caffe Icon" /> 
                                <p>On Hotel Cafe</p>
                            </div>
                        )
                    }
                    {
                        hotel && hotel.Wifi == "true" && (
                            <div>
                                <img src={"http://localhost:3000/icon/wifiIcon.png"} alt="Wifi Icon" />
                                <p>Free Wifi</p>
                            </div>
                        )
                    }
                    {
                        hotel && hotel.breakfast == "true" && (
                            <div>
                                <img src={"http://localhost:3000/icon/breakfastIcon.png"} alt="Breakfast Icon" /> 
                                <p>Breakfast</p>
                            </div>
                        )
                    }
                    {
                        hotel && hotel.pool == "true" && (
                            <div>
                                <img src={"http://localhost:3000/icon/swimmingIcon.png"} alt="Swimming Pool Icon" /> 
                                <p>Swimming Pool</p>
                            </div>
                        )
                    }
                    
                </div>

            </div>


            {/* -------- PRICES -------- */}
            <h3 id={styling.price}>Price</h3>
            <div id={styling.middle}>
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
                <div className={styling.exceptional}>
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

            <button>
                <a href="https://wa.me/6287771878828?text=Hello%20there!">
                    Request
                </a>
            </button>
        </div>
    );
}

export default HotelDescriptionPage;