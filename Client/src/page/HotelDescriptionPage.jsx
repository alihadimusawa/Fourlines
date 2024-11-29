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

    // ---------- Getting hotel from the server ----------
    const { hotel_id } = useParams();

    // this is the variable to store all the hotel prices that we get from the backend
    const [hotel, setHotel] = useState(null);

    async function gethotelsById(hotel_id) {
        try {
            const response = await axios.post(`http://localhost:3000/getHotelById/${hotel_id}`);
            setHotel(response.data);
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

    // to check if the website is in the first render
    const isFirstRender = useRef(true);

    useEffect(() => {
        gethotelsById(hotel_id);
    }, [hotel_id]);

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

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

        hotel && hotel.forEach((current) => {
            let mulaiDate = convertToDate(current.mulai);
            let akhirDate = convertToDate(current.akhir);
            if (newUser >= mulaiDate && newUser <= akhirDate) {
                setPriceId(current.price_id);
            }

            // console.log("mulaiDate");
            // console.log(mulaiDate);
            // console.log("\n");
            // console.log("akhir date");
            // console.log(akhirDate);
            // console.log("\n");
            // console.log("user date");
            // console.log(newUser);
            // console.log("\n");


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
    const [hotelImages, setHotelImages] = useState("");



    return (
        <div>

            {hotel ? (
                <div className={HotelStyling.page}>

                    {/* -------- TOP -------- */}
                    <div className={HotelStyling.top}>
                        <img src="http://localhost:3000/icon/backIcon.png" alt="Back Icon" />
                        <h1>{hotel[0].hotel_name}</h1>
                        <div className={HotelStyling.addressContainer}>
                            <img src="http://localhost:3000/icon/addressIcon.png" alt="Address Icon" />
                            <p>{hotel[0].address}</p>
                        </div>
                    </div>


                    {/* -------- Slide Show --------  */}
                    <div className={HotelStyling.imageCarousel}>
                        <button> &#8594; </button>

                        <img src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt="" />
                        <img src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg" alt="" />
                        <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />

                        <button> &#8592; </button>
                    </div>

                    {/* -------- Main Service --------  */}
                    


                    <div id={HotelStyling.top}>
                        <img src={hotel[0].image} alt={hotel.hotel_name} />
                    </div>

                    <h3 id={HotelStyling.price}>Price</h3>
                    {/* MIDDLE */}
                    <div id={HotelStyling.middle}>
                        {
                            priceId != "0"
                                ?
                                hotel.map((current, index) => (
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
                        <HotelBenefitsContainer
                            rating={hotel[0].rating}
                            jarak={hotel[0].jarak}
                            kamar={hotel[0].kamar}
                            transportasi={hotel[0].transportasi}
                        />
                    </div>

                    <button>
                        <a href="https://wa.me/6287771878828?text=Hello%20there!">
                            Request
                        </a>
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default HotelDescriptionPage;