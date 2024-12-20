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
    const [currentImage, setCurrentImage] = useState(0);

    async function getHotelsImages(hotel_id) {
        try {
            const response = await axios.post(`http://localhost:3000/getHotelImageById/${hotel_id}`)
            setHotelImages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function changeImage(currentImageNumber, choice) {
        console.log(currentImageNumber);
        let imageLength = hotelImages.length;
        if (imageLength > 0) {
            imageLength -= 1;

            if (choice == "next") {
                // we are on the last image
                if (imageLength == currentImageNumber) {
                    setCurrentImage(0);
                }

                else {
                    currentImageNumber += 1;
                    setCurrentImage(currentImageNumber);
                }
            } else if (choice == "prev") {
                // we are on the first image
                if (currentImageNumber == 0) {
                    setCurrentImage(imageLength);
                }

                else {
                    currentImageNumber -= 1;
                    setCurrentImage(currentImageNumber);
                }
            }

        }
    }

    // USE EFFECT FOR TAKING THE FIRST PRICES, AND IMAGES
    useEffect(() => {
        getHotelsPrices(hotel_id);
        getHotelsImages(hotel_id);
    }, []);




    return (
        <div className={styling.hotelDescriptionPage}>

            {/* -------- TOP -------- */}
            <div className={styling.top}>
                <a href="/Hotels" id={styling.topImageContainer}>
                    <img src="http://localhost:3000/icon/backIcon.png" alt="Back Icon" id={styling.backIcon} />
                </a>
                <h1>{hotel && hotel.hotel_name}</h1>
                <div className={styling.addressContainer}>
                    <div>
                        <img src="http://localhost:3000/icon/addressIcon.png" alt="Address Icon" id={styling.addressIcon} />
                        <p>{hotel && hotel.address}</p>
                    </div>
                </div>
            </div>

            {/* -------- IMAGE SLIDESHOW -------- */}
            <div className={styling.carousel}>
                <button id={styling.prevButton} onClick={() => changeImage(currentImage, "prev")}>«</button>
                <div>
                    <img src={

                        hotelImages.length > 0
                            ? hotelImages[currentImage].image
                            : ""

                    } alt="hotel Image" />
                </div>
                <button id={styling.nextButton} onClick={() => changeImage(currentImage, "next")}>»</button>
            </div>


            {/* -------- MAIN SERVICE CONTAINER -------- */}
            <div className={styling.mainServiceContainer}>
                <img src={"http://localhost:3000/icon/makkahBlueIcon.png"} alt="Makkah Icon" />
                <div>
                    <p className={styling.brave}>{distance} {km ? "km" : "m"}</p>
                    <p>From Mecca</p>
                </div>


                <img src={"http://localhost:3000/icon/roomIcon.png"} alt="Room Available Icon" />
                <div>
                    <p className={styling.brave}>{hotel && hotel.kamar} Room</p>
                    <p>Available</p>
                </div>


                <img src={"http://localhost:3000/icon/shuttleBlueIcon.png"} alt="Shuttle Icon" id={styling.shuttleBus} />
                <div>
                    <p className={styling.brave}>{hotel && hotel.transportasi}</p>
                    <p>Pick and Drop</p>
                </div>

                <div className={styling.ratingContainer}>
                    <p className={styling.brave}>{hotel && hotel.rating}</p>
                    {
                        ratingImage.length > 0 && ratingImage.map((current, index) => {
                            if (current == "full") return <img src={"http://localhost:3000/icon/starBlueIcon.png"} alt="Star" key={index} className={styling.star} />
                            else if (current == "half") return <img src={"http://localhost:3000/icon/starHalfIcon.png"} alt="Star half" key={index} className={styling.star} />
                            else if (current == "empty") return <img src={"http://localhost:3000/icon/starWhiteIcon.png"} alt="Star" key={index} className={styling.star} />
                        })
                    }

                </div>
            </div>


            {/* -------- DESCRIPTION AND SECONDARY SERVICE -------- */}
            <div className={styling.content}>
                
                {hotel &&
                    <p
                        className={styling.description}
                        dangerouslySetInnerHTML={{ __html: hotel.description.replace(/\n/g, "<br />") }}
                    />
                }



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
            <div id={styling.prices}>
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

                            className={styling.datePicker}

                            sx={{
                                width: {
                                    xs: 90, //0
                                    sm: 180, //600
                                    md: 260, //900
                                    lg: 250, //1200
                                    xl: 320, //1536
                                }
                            }}
                        />
                    </LocalizationProvider>
                </div>

            </div>

            {/* ------- REQUEST BUTTON ------- */}
            <button className={styling.requestButton}>
                <a href="https://wa.me/6287771878828?text=Hello%20there!">
                    Request
                </a>
            </button>
        </div>
    );
}

export default HotelDescriptionPage;